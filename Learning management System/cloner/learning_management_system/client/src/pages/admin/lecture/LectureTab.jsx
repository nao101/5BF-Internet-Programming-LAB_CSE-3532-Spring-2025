import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle , CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useRemoveLectureMutation } from '@/features/api/courseApi'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  

     const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const params = useParams();
    const rawId = useParams().courseId;
   const courseId = rawId?.replace("course._", "");

   const lectureId=useParams().lectureId;


   const [edtiLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();


     const [removeLecture,{data:removeData, isLoading:removeLoading, isSuccess:removeSuccess}] = useRemoveLectureMutation();

   const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          console.log(res);
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };


    const editLectureHandler = async () => {
     console.log({ lectureTitle, uploadVideInfo, isFree, courseId, lectureId });

    await edtiLecture({
      lectureTitle,
      videoInfo:uploadVideInfo,
      isPreviewFree:isFree,
      courseId,
      lectureId,
    });
  };

  
  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  }


     useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(()=>{
    if(removeSuccess){
      toast.success(removeData.message);
    }
  },[removeSuccess])

  return (
    <Card>
          <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button  variant="destructive" onClick={removeLectureHandler}>
           Remove Lecture
          </Button>
        </div>
      </CardHeader>
       <CardContent>
        <div>
          <Label>Title</Label>
          <Input
             value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange ={fileChangeHandler}
            placeholder="Ex. Introduction to Javascript"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch id="airplane-mode"
           className="data-[state=checked]:bg-green-600 bg-gray-300" />
          <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>

       {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="mt-4">
          <Button onClick={editLectureHandler} >
              update lecture
          </Button>
        </div>
      </CardContent>

    </Card>
  )
}

export default LectureTab
