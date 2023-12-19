export interface Video {
  id?: number;
  name: string;
  videoData: Blob; // Assuming the video data is a Blob object
  parsedURL : string;
}
export interface ImageCustom {
  id?: number;
  name: string;
  imageData: Blob; // Assuming the image data is a Blob object
}
export class VideoDatabase {
  private db: IDBDatabase | null = null;

  constructor(private dbName: string, private dbVersion: number) {
    this.openDatabase();
  }

  openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;
        const store = db.createObjectStore('videos', { keyPath: 'id', autoIncrement: true });
        const imageStore = db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('videoData', 'videoData', { unique: false });
        imageStore.createIndex('name', 'name', { unique: false });
        imageStore.createIndex('imageData', 'imageData', { unique: false });
      };

      request.onsuccess = event => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = event => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  private ensureDatabaseInitialized(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
      } else {
        this.openDatabase()
          .then(db => resolve(db))
          .catch(error => reject(error));
      }
    });
  }

  addVideo(video: Video): Promise<number> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['videos'], 'readwrite');
        const store = transaction.objectStore('videos');
        const request = store.add(video);

        return new Promise<number>((resolve, reject) => {
          request.onsuccess = event => {
            const insertedId = (event.target as IDBRequest).result as number;
            resolve(insertedId);
          };

          request.onerror = event => {
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }

  addImage(image: ImageCustom): Promise<number> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['images'], 'readwrite');
        const store = transaction.objectStore('images');
        const request = store.add(image);

        return new Promise<number>((resolve, reject) => {
          request.onsuccess = event => {
            const insertedId = (event.target as IDBRequest).result as number;
            resolve(insertedId);
          };

          request.onerror = event => {
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }

  getVideo(id: number): Promise<Video | undefined> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['videos'], 'readonly');
        const store = transaction.objectStore('videos');
        const request = store.get(id);

        return new Promise<Video | undefined>((resolve, reject) => {
          request.onsuccess = event => {
            const video = (event.target as IDBRequest).result as Video;
            resolve(video);
          };

          request.onerror = event => {
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }

  getVideoByName(videoName: string): Promise<Video | undefined> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['videos'], 'readonly');
        const store = transaction.objectStore('videos');
        const index = store.index('name');
        const request = index.get(videoName);

        return new Promise<Video | undefined>((resolve, reject) => {
          request.onsuccess = event => {
            console.log('getVideoByName onsuccess');
            
            const video = (event.target as IDBRequest).result as Video;
            console.log(video);
            console.log(request);
            resolve(video);
          };

          request.onerror = event => {
            console.log('getVideoByName onerror');
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }

  getVideoByNameOrAddAll(videoName: string): Promise<Video | undefined> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['videos'], 'readonly');
        const store = transaction.objectStore('videos');
        const index = store.index('name');
        const request = index.get(videoName);

        return new Promise<Video | undefined>((resolve, reject) => {
          request.onsuccess = event => {
            console.log('getVideoByName onsuccess');
            
            const video = (event.target as IDBRequest).result as Video;
            console.log(video);
            console.log(request);
            resolve(video);
          };

          request.onerror = event => {
            console.log('getVideoByName onerror');
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }

  getImageByNameOrAdd(imageName: string): Promise<ImageCustom | undefined> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['images'], 'readonly');
        const store = transaction.objectStore('images');
        const index = store.index('name');
        const request = index.get(imageName);

        return new Promise<ImageCustom | undefined>((resolve, reject) => {
          request.onsuccess = event => {
            console.log('getImageByNameOrAdd onsuccess');
            
            const image = (event.target as IDBRequest).result as ImageCustom;
            console.log(image);
            console.log(request);
            resolve(image);
          };

          request.onerror = event => {
            console.log('getImageByNameOrAdd onerror');
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }

  getAllVideos(): Promise<Video[]> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['videos'], 'readonly');
        const store = transaction.objectStore('videos');
        const request = store.getAll();

        return new Promise<Video[]>((resolve, reject) => {
          request.onsuccess = event => {
            const videos = (event.target as IDBRequest).result as Video[];
            resolve(videos);
          };

          request.onerror = event => {
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }

  clearAllVideos(): Promise<void> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['videos'], 'readwrite');
        const store = transaction.objectStore('videos');
        const request = store.clear();

        return new Promise<void>((resolve, reject) => {
          request.onsuccess = () => {
            resolve();
          };

          request.onerror = event => {
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }

  checkVideoExistsByName(videoName: string): Promise<boolean> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['videos'], 'readonly');
        const store = transaction.objectStore('videos');
        const index = store.index('name');
        const request = index.openCursor(IDBKeyRange.only(videoName));

        return new Promise<boolean>((resolve, reject) => {
          request.onsuccess = event => {
            const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
            if (cursor) {
              resolve(true); // Video with this name exists
            } else {
              resolve(false); // No video found with this name
            }
          };

          request.onerror = event => {
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }
}

import video_animation_path from "../../../video/outputs/sequence2.mp4"
import video_animation_path1 from "../../../video/outputs/anima_1.mp4"
import video_animation_path2 from "../../../video/outputs/anima_2.mp4"
import video_animation_path3 from "../../../video/outputs/anima_3.mp4"
import video_animation_path4 from "../../../video/outputs/anima_4.mp4"
import video_animation_path5 from "../../../video/outputs/anima_5.mp4"
import video_animation_path6 from "../../../video/outputs/anima_6.mp4"
import video_animation_path7 from "../../../video/outputs/anima_7.mp4"
import video_animation_path8 from "../../../video/outputs/anima_8.mp4"
import video_animation_path9 from "../../../video/outputs/anima_9.mp4"
import video_animation_path10 from "../../../video/outputs/anima_10.mp4"

import video_animation_path11 from "../../../video/outputs/anima_11.mp4"
import video_animation_path12 from "../../../video/outputs/anima_12.mp4"
import video_animation_path13 from "../../../video/outputs/anima_13.mp4"
import video_animation_path14 from "../../../video/outputs/anima_14.mp4"
import video_animation_path15 from "../../../video/outputs/anima_15.mp4"
import video_animation_path16 from "../../../video/outputs/anima_16.mp4"
import video_animation_path17 from "../../../video/outputs/anima_17.mp4"
import video_animation_path18 from "../../../video/outputs/anima_18.mp4"
import video_animation_path19 from "../../../video/outputs/anima_19.mp4"
import video_animation_path20 from "../../../video/outputs/anima_20.mp4"

import video_animation_path21 from "../../../video/outputs/anima_21.mp4"
import video_animation_path22 from "../../../video/outputs/anima_22.mp4"
import video_animation_path23 from "../../../video/outputs/anima_23.mp4"
import video_animation_path24 from "../../../video/outputs/anima_24.mp4"
import video_animation_path25 from "../../../video/outputs/anima_25.mp4"
import video_animation_path26 from "../../../video/outputs/anima_26.mp4"
import video_animation_path27 from "../../../video/outputs/anima_27.mp4"
import video_animation_path28 from "../../../video/outputs/anima_28.mp4"
import video_animation_path29 from "../../../video/outputs/anima_29.mp4"
import video_animation_path30 from "../../../video/outputs/anima_30.mp4"

import video_animation_path31 from "../../../video/outputs/anima_31.mp4"
import video_animation_path32 from "../../../video/outputs/anima_32.mp4"
import video_animation_path33 from "../../../video/outputs/anima_33.mp4"
import video_animation_path34 from "../../../video/outputs/anima_34.mp4"
import video_animation_path35 from "../../../video/outputs/anima_35.mp4"
import video_animation_path36 from "../../../video/outputs/anima_36.mp4"
import video_animation_path37 from "../../../video/outputs/anima_37.mp4"
import video_animation_path38 from "../../../video/outputs/anima_38.mp4"
import video_animation_path39 from "../../../video/outputs/anima_39.mp4"
import video_animation_path40 from "../../../video/outputs/anima_40.mp4"

import video_animation_path41 from "../../../video/outputs/anima_41.mp4"
import video_animation_path42 from "../../../video/outputs/anima_42.mp4"
import video_animation_path43 from "../../../video/outputs/anima_43.mp4"
import video_animation_path44 from "../../../video/outputs/anima_44.mp4"
import video_animation_path45 from "../../../video/outputs/anima_45.mp4"
import video_animation_path46 from "../../../video/outputs/anima_46.mp4"
import video_animation_path47 from "../../../video/outputs/anima_47.mp4"
import video_animation_path48 from "../../../video/outputs/anima_48.mp4"
import video_animation_path49 from "../../../video/outputs/anima_49.mp4"
import video_animation_path50 from "../../../video/outputs/anima_50.mp4"

import video_animation_path51 from "../../../video/outputs/anima_51.mp4"
import video_animation_path52 from "../../../video/outputs/anima_52.mp4"
import video_animation_path53 from "../../../video/outputs/anima_53.mp4"
import video_animation_path54 from "../../../video/outputs/anima_54.mp4"
import video_animation_path55 from "../../../video/outputs/anima_55.mp4"
import video_animation_path56 from "../../../video/outputs/anima_56.mp4"
import video_animation_path57 from "../../../video/outputs/anima_57.mp4"
import video_animation_path58 from "../../../video/outputs/anima_58.mp4"
import video_animation_path59 from "../../../video/outputs/anima_59.mp4"
import video_animation_path60 from "../../../video/outputs/anima_60.mp4"

import video_animation_path61 from "../../../video/outputs/anima_61.mp4"
import video_animation_path62 from "../../../video/outputs/anima_62.mp4"
import video_animation_path63 from "../../../video/outputs/anima_63.mp4"
import video_animation_path64 from "../../../video/outputs/anima_64.mp4"
import video_animation_path65 from "../../../video/outputs/anima_65.mp4"
import video_animation_path66 from "../../../video/outputs/anima_66.mp4"
import video_animation_path67 from "../../../video/outputs/anima_67.mp4"
import video_animation_path68 from "../../../video/outputs/anima_68.mp4"
import video_animation_path69 from "../../../video/outputs/anima_69.mp4"
import video_animation_path70 from "../../../video/outputs/anima_70.mp4"

import video_animation_path71 from "../../../video/outputs/anima_71.mp4"
import video_animation_path72 from "../../../video/outputs/anima_72.mp4"
import video_animation_path73 from "../../../video/outputs/anima_73.mp4"
import video_animation_path74 from "../../../video/outputs/anima_74.mp4"
import video_animation_path75 from "../../../video/outputs/anima_75.mp4"
import video_animation_path76 from "../../../video/outputs/anima_76.mp4"
import video_animation_path77 from "../../../video/outputs/anima_77.mp4"
import video_animation_path78 from "../../../video/outputs/anima_78.mp4"
import video_animation_path79 from "../../../video/outputs/anima_79.mp4"
import video_animation_path80 from "../../../video/outputs/anima_80.mp4"
import { list_of_animation } from "../../KenoGame/util/KenoGame.util";

import carpetImage from "../../../Images/carpeet.jpg"

const saveVideo = (name: string, video_path: string) => {
  console.log(name);
  
  fetch(video_path).then(async r =>{
    r.blob().then(blob => {
        const videoDB = new VideoDatabase('VideoDatabase', 1);

    // Add a video to the database
        const exampleVideo: Video = {
            name: name+'.mp4', // Replace with your video name
            videoData: blob,/* Your video Blob data */
            parsedURL: URL.createObjectURL(blob)
        };
        console.log(exampleVideo);
        
        videoDB.addVideo(exampleVideo)
        .then((insertedId: any) => {
            console.log('Video added with ID:', insertedId);

            // Use the insertedId to retrieve the video
            videoDB.getVideo(insertedId)
            .then((video: any) => {
                if (video) {
                console.log('Retrieved video:', video);
                } else {
                console.log('Video not found');
                }
            })
            .catch((error: any) => {
                console.error('Error retrieving video:', error);
            });

            // Check if a video with a specific name exists
            const videoNameToCheck = name+'.mp4'; // Replace with the video name you want to check
            videoDB.checkVideoExistsByName(videoNameToCheck)
            .then((exists: any) => {
                if (exists) {
                console.log('Video with name', videoNameToCheck, 'exists in the database.');
                } else {
                console.log('Video with name', videoNameToCheck, 'does not exist in the database.');
                }
            })
            .catch((error: any) => {
                console.error('Error checking video existence:', error);
            });
            })
            .catch((error: any) => {
                console.error('Error adding video:', error);
            });
        })
  })
}

const saveVideoAndReload = (name: string, video_path: string) => {
  console.log(name);
  
  fetch(video_path).then(async r =>{
    r.blob().then(blob => {
        const videoDB = new VideoDatabase('VideoDatabase', 1);

    // Add a video to the database
        const exampleVideo: Video = {
            name: name+'.mp4', // Replace with your video name
            videoData: blob,/* Your video Blob data */
            parsedURL: URL.createObjectURL(blob)
        };
        console.log(exampleVideo);
        
        videoDB.addVideo(exampleVideo)
        .then((insertedId: any) => {
            console.log('Video added with ID:', insertedId);

            // Use the insertedId to retrieve the video
            videoDB.getVideo(insertedId)
            .then((video: any) => {
                if (video) {
                console.log('Retrieved video:', video);
                } else {
                console.log('Video not found');
                }
            })
            .catch((error: any) => {
                console.error('Error retrieving video:', error);
            });

            // Check if a video with a specific name exists
            const videoNameToCheck = name+'.mp4'; // Replace with the video name you want to check
            videoDB.checkVideoExistsByName(videoNameToCheck)
            .then((exists: any) => {
                if (exists) {
                  console.log('Video with name', videoNameToCheck, 'exists in the database.');
                  if(name === 'animation_80'){
                    
                    confirm('need reload for animation_80 loaded in resource page')
                    window.location.reload();
                  }
                } else {
                console.log('Video with name', videoNameToCheck, 'does not exist in the database.');
                }
            })
            .catch((error: any) => {
                console.error('Error checking video existence:', error);
            });
            })
            .catch((error: any) => {
                console.error('Error adding video:', error);
            });
        })
  })
}

export const saveVideoByName = (name: string, number:number) =>{
  console.log('name 204');
  console.log(name);
  
  if(name === 'animation'){    
    saveVideo(name, video_animation_path)
  }
  else{
    console.log(list_of_animation['animation_'+number]);
    
    saveVideo(name, list_of_animation['animation_'+number])
  }
}

export const saveVideoByNameAndReload = (name: string, number:number) =>{
  console.log('name 204');
  console.log(name);
  
  if(name === 'animation'){    
    saveVideo(name, video_animation_path)
  }
  else{
    console.log(list_of_animation['animation_'+number]);
    
    saveVideo(name, list_of_animation['animation_'+number])
    if(number === 80){
      saveVideoAndReload(name, list_of_animation['animation_'+number])
    }
  }
}

export const retriveAllVideos = (setVideos: Function) => {  
  const videoDB = new VideoDatabase('VideoDatabase', 1);
  videoDB.getAllVideos().then(result => {
    console.log(result);
    setVideos(result)
  })
  setVideos([])
}

export const saveAllVideos = (setSetVideoList: Function) => {
  saveVideoByName("animation", 0);

  [0,10,20,30,40,50,60,70].forEach(element => {
    [1,2,3,4,5,6,7,8,9,10].forEach(async element_ => {
      console.log("animation_"+(element+element_));
      
      saveVideoByName("animation_" + (element + element_), element + element_)
    });
  });
  
  retriveAllVideos(setSetVideoList)
}

export const saveAllVideosAndReload = () => {
  saveVideoByName("animation", 0);

  [0,10,20,30,40,50,60,70].forEach(element => {
    [1,2,3,4,5,6,7,8,9,10].forEach(async element_ => {
      const animation = element + element_
      console.log("animation_"+animation);
      
      saveVideoByName("animation_" + animation, animation)    
      if(animation === 80){
        saveVideoByNameAndReload("animation_" + animation, animation)
      }
    });
  });
  
}

export const clearAllVideos = (setSetVideoList: Function) => {
   
  const videoDB = new VideoDatabase('VideoDatabase', 1);
  videoDB.clearAllVideos().then(result => {
    retriveAllVideos(setSetVideoList)
  })
}

export const getVideoByName = (name: string): Video | undefined  => {
   
  const videoDB = new VideoDatabase('VideoDatabase', 1);
  
  videoDB.getVideoByName(name+'.mp4')
  .then(video => {
    if (video) {
      console.log('Retrieved video:', video);
      // Optionally, update the component state or perform actions with the retrieved video.
      return video
    } else {
      console.log('Video not found');
      return undefined
    }
  })
  .catch(error => {
    console.error('Error retrieving video', error);
    return undefined
  });
  return undefined
}

export const getVideoByNameOrAddAll = (name: string): Video | undefined  => {
   
  const videoDB = new VideoDatabase('VideoDatabase', 1);
  
  videoDB.getVideoByNameOrAddAll(name+'.mp4')
  .then(video => {
    if (video) {
      console.log('Retrieved video:', video);
      // Optionally, update the component state or perform actions with the retrieved video.
      return video
    } else {
      console.log('Video not found:::::');
      saveAllVideosAndReload()
      return undefined
    }
  })
  .catch(error => {
    console.error('Error retrieving video:::::', error);
    return undefined
  });
  return undefined
}

export const getVideoByNameUpdateState = (name: string, updateState: Function)  => {
   
  const videoDB = new VideoDatabase('VideoDatabase', 1);
  
  videoDB.getVideoByNameOrAddAll(name+'.mp4')
  .then(video => {
    if (video) {
      console.log('Retrieved video:', video);
      // Optionally, update the component state or perform actions with the retrieved video.
      updateState(video)
    } else {
      console.log('Video not found:::::::');
      // saveAllVideos(console.log)
      saveAllVideosAndReload()
      updateState(null)
    }
  })
  .catch(error => {
    console.error('Error retrieving video:::::::::', error);
    return undefined
  });
  return undefined
}

export const getVideoListByName = (names: string[], updateState: Function)  => {
   
  const videoDB = new VideoDatabase('VideoDatabase', 1);
  const videoList:Video[] = []
  for (let index = 0; index < names.length; index++) {
    const element = names[index];
    
    videoDB.getVideoByName(element+'.mp4')
    .then(video => {
      if (video) {
        console.log('Retrieved video:', video);
        // Optionally, update the component state or perform actions with the retrieved video.
        videoList.push(video)
      } else {
        console.log('Video not found');
        // return undefined
      }
    })
    .catch(error => {
      console.error('Error retrieving video:', error);
      // return undefined
    });
  }
  updateState(videoList)
  // return undefined
}


export const saveCarpeetImage = () => {
  
  fetch(carpetImage).then(async r =>{
    r.blob().then(blob => {
        const videoDB = new VideoDatabase('VideoDatabase', 1);

    // Add a video to the database
        const exampleImage: ImageCustom = {
            name: 'carpeet.jpg', // Replace with your video name
            imageData: blob,/* Your video Blob data */
        };
        console.log(exampleImage);
        
        videoDB.addImage(exampleImage)
        .then((insertedId: any) => {
            console.log('Image added with ID:', insertedId);

            // Use the insertedId to retrieve the video
            videoDB.getVideo(insertedId)
            .then((image: any) => {
                if (image) {
                console.log('Retrieved Image:', image);
                } else {
                console.log('Image not found');
                }
            })
            .catch((error: any) => {
                console.error('Error retrieving Image:', error);
            });

            // Check if a video with a specific name exists
            const videoNameToCheck = 'carpeet.jpg'; // Replace with the video name you want to check
            videoDB.checkVideoExistsByName(videoNameToCheck)
            .then((exists: any) => {
                if (exists) {
                console.log('Image with name', videoNameToCheck, 'exists in the database.');
                } else {
                console.log('Image with name', videoNameToCheck, 'does not exist in the database.');
                }
            })
            .catch((error: any) => {
                console.error('Error checking image existence:', error);
            });
            })
            .catch((error: any) => {
                console.error('Error adding image:', error);
            });
        })
  })
}

export const getCarpeetImageUpdateState = (name: string, updateState: Function)  => {
   
  const videoDB = new VideoDatabase('VideoDatabase', 1);
  
  videoDB.getImageByNameOrAdd('carpeet.jpg')
  .then(image => {
    if (image) {
      console.log('Retrieved image:', image);
      // Optionally, update the component state or perform actions with the retrieved image.
      updateState(image)
    } else {
      console.log('Image not found:::::::');
      saveCarpeetImage()
      updateState(null)
    }
  })
  .catch(error => {
    console.error('Error retrieving Image:::::::::', error);
    return undefined
  });
  return undefined
}
