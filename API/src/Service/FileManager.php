<?php


namespace App\Service;


use App\Entity\Asset;
use App\Entity\Resource;
use Exception;
use http\Env\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Uid\Uuid;

class FileManager
{

    const AUTHORIZED_IMAGE_TYPE = [
      "image/png",
      "image/gif",
      "image/jpg",
      "image/svg",
      "image/jpeg"
    ];

    const AUTHORIZED_VIDEO_TYPE = [
      "video/mp4",
      "video/ogg",
      "video/webm",
      //.avi File
      "video/x-msvideo"
    ];

    const AUTHORIZED_AUDIO_TYPE = [
        "audio/mp3",
        "audio/ogg",
        //.wav File
        "audio/x-wav",
    ];

    /**
     * @param UploadedFile $file
     * @param string $projectDir
     * @return Asset
     */
    public function UploadFile(UploadedFile $file, string $projectDir): Asset
    {

        //Check if valid MimeType
        $asset = new Asset();
        $asset->setOriginalName($file->getClientOriginalName());
        $fileName = Uuid::v4() . "." . $file->getClientOriginalExtension();
        $asset->setFileName($fileName);
        //Todo: Check Size


        //Set Type as first part of MimeFormat
        $fileType = explode('/', $file->getMimeType())[0];
        $this->checkType($file->getMimeType());
        $asset->setAssetType($fileType);
        $file->move($projectDir . '/public/uploads', $fileName);
        $asset->setFullPath($projectDir . '/public/uploads' . $fileName);
        return $asset;
    }

    public function getBinaryFile(Asset $asset, string $projectDir): BinaryFileResponse
    {
        $file = $projectDir. '/public/uploads/'.$asset->getFileName();
        return new BinaryFileResponse($file);
    }

    /**
     * @param string $fileType
     * @return JsonResponse|void
     * @throws Exception
     */
    public function checkType(string $fileType)
    {
        $fileFormat = explode('/', $fileType)[0];
        $fileExtension = explode('/', $fileType)[1];
        switch ($fileFormat)
        {
            case"video":
                if (!in_array($fileType, self::AUTHORIZED_VIDEO_TYPE)) {
                    throw new Exception("File format '" . $fileExtension . "' is not valid");
                }
                break;
            case"audio":
                if (!in_array($fileType, self::AUTHORIZED_AUDIO_TYPE)) {
                    throw new Exception("File format '" . $fileExtension . "' is not valid");
                }
                break;
            case"image":
                if (!in_array($fileType, self::AUTHORIZED_IMAGE_TYPE)) {
                    throw new Exception("File format '" . $fileExtension . "' is not valid");
                }
                break;
            default:
                throw new Exception("File format '" . $fileExtension . "' is not valid");
        }

    }

    /**
     * @param Resource $resource
     * @param string $fileType
     * @return JsonResponse|void
     * @throws Exception
     */
    public function CheckMimeTypeConstraints(Resource $resource)
    {
           if (!empty($resource->getAssets()))
           {
               $assetType = [];
               /** @var Asset $asset */
               foreach ($resource->getAssets() as $asset)
               {
                   array_push($assetType, $asset->getAssetType());
               }

               if (sizeof($assetType) > 6){
                   throw new Exception("You cannot upload different assets in the same resources", 500);

               }

               if (!in_array($resource->getType()->getTypeName(), $assetType))
               {
                   throw new Exception("You need to match the Ressource type and the asset", 500);
               }

               //Check if resources are the same Type
               /*if (!count(array_unique($assetType)))
               {
                   return new JsonResponse("You cannot upload different assets in the same resources");

               }*/
           }
    }
}