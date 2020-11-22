const Koa = require('koa');

const Router = require('@koa/router');
const { TagModel } = require('../db/models');
const { getServiceObject } = require('../lib/rest_full_service');
const multer = require('@koa/multer');
const upload = multer({
    dest: 'data/tmp',
}); // note you can pass `multer` options here
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const serviceObject = getServiceObject({ Model: TagModel });
const got = require('got');
const { NodeHelper } = require('../lib/node_helper');
const { ApiSuccessHandler } = require('../lib/handler');

const MedAnalyzeService = new Koa();

const router = new Router({});

const Handle = {
    async get(ctx, next) {
        ApiSuccessHandler.sendJson(ctx, 'Chạy ok');
    },
    async analyze_photo(ctx, next) {
        const API_URL = 'http://202.191.56.63:50055';
        let { photo = [] } = ctx.request.files || {};
        const form = new FormData();
        let filePath = photo[0].path;
        let fileName = photo[0].originalname;
        let oldPath = NodeHelper.getPathFromProject(filePath);
        let newPath = NodeHelper.getPathFromProject(
            `data/public/process/${NodeHelper.getNewMongoId()}.${NodeHelper.getFileExtension(fileName)}`
        );
        await fs.promises.rename(oldPath, newPath);

        form.append('image', fs.createReadStream(newPath));
        let delta_time = Date.now();
        let { body } = await got.post(`${API_URL}/api`, {
            body: form,
            responseType: 'json',
        });
        delta_time = Date.now() - delta_time;
        let mask_path = `${API_URL}/static/images/${body.mask_path}`;
        let bb_path = `${API_URL}/static/images/${body.bb_path}`;

        ApiSuccessHandler.sendJson(ctx, 'Xử lý hình ảnh thành công', { mask_path, bb_path, delta_time });
    },
    async analyze_video(ctx, next) {
        const API_URL = 'http://202.191.56.63:50055';
        let { video = [] } = ctx.request.files || {};
        let filePath = video[0].path;
        let fileName = String(NodeHelper.getNewMongoId());
        let fileExtension = NodeHelper.getFileExtension(video[0].originalname);
        let oldPath = NodeHelper.getPathFromProject(filePath);
        let newPath = NodeHelper.getPathFromProject(`data/public/process/${fileName}.${fileExtension}`);
        await fs.promises.rename(oldPath, newPath);
        let splitImgDir = NodeHelper.getPathFromProject(`data/public/process/${fileName}`);
        await fs.promises.mkdir(splitImgDir, { recursive: true });
        let fps = 1;
        await NodeHelper.runCmd(`ffmpeg -i ${newPath} -vf fps=${fps} ${splitImgDir}/out%04d.png`);
        let filesToAnalyze = await fs.promises.readdir(splitImgDir);
        let images = [];
        for (let i = 0; i < filesToAnalyze.length; i++) {
            let file = filesToAnalyze[i];
            const form = new FormData();
            form.append('image', fs.createReadStream(path.join(splitImgDir, file)));
            let delta_time = Date.now();
            let { body } = await got.post(`${API_URL}/api`, {
                body: form,
                responseType: 'json',
            });

            delta_time = Date.now() - delta_time;
            let mask_path = `${API_URL}/static/images/${body.mask_path}`;
            let bb_path = `${API_URL}/static/images/${body.bb_path}`;
            await got.stream(bb_path).pipe(fs.createWriteStream(path.join(splitImgDir, `bb_${file}`)));
            await got.stream(mask_path).pipe(fs.createWriteStream(path.join(splitImgDir, `mask_${file}`)));
            images.push({ mask_path, bb_path, filename: file, delta_time });
        }
        await NodeHelper.runCmd(
            `cd ${splitImgDir} && ffmpeg -r ${fps} -i bb_out%04d.png -c:v libx264 -vf fps=1 -pix_fmt yuv420p bb_out.mp4`
        );
        await NodeHelper.runCmd(
            `cd ${splitImgDir} && ffmpeg -r ${fps} -i mask_out%04d.png -c:v libx264 -vf fps=1 -pix_fmt yuv420p mask_out.mp4`
        );
        let videos = {
            original_video_path: `/data/public/process/${fileName}.${fileExtension}`,
            bb_video_path: `/data/public/process/${fileName}/bb_out.mp4`,
            mask_video_path: `/data/public/process/${fileName}/mask_out.mp4`,
        };

        ApiSuccessHandler.sendJson(ctx, 'Xử lý video thành công', { videos });
    },
};

router.get('/polyb', Handle.get);
router.post('/polyb', upload.fields([{ name: 'photo', maxCount: 1 }]), Handle.analyze_photo);
router.post('/polyb-video', upload.fields([{ name: 'video' }]), Handle.analyze_video);

MedAnalyzeService.use(router.routes()).use(router.allowedMethods());

module.exports = { MedAnalyzeService };
