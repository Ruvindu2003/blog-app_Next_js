import { Controller, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dp7yogyps',
    api_key: '596684345492442',
    api_secret: 'KKyUIVt2qreJ1Rq1_L8PUqWyKRs',
});

@Controller('upload')
export class UploadController {
    @Post('image')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            return { error: 'No file provided' };
        }

        try {
            // Convert buffer to base64 data URI
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = `data:${file.mimetype};base64,${b64}`;

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(dataURI, {
                folder: 'blog-posts',
                resource_type: 'auto',
            });

            return {
                url: result.secure_url,
                public_id: result.public_id,
            };
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            return { error: 'Upload failed' };
        }
    }
}
