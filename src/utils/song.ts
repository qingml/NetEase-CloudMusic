import { IRecommendSongItem } from "@/components/base/song-list/type";
import { formatSecond } from "./number";

/** 格式化歌手 */
export const formatSinger = (singers: any) => {
  if(singers) {
     return singers.map((item: any) => item.name).join(" / ");
  }
 
};

/** 格式化歌曲 */
export const formatSong = (musicData: any) => {
  return {
    id: musicData.id,
    name: musicData.name,
    singer: formatSinger(musicData?.song?.artists || musicData?.ar||musicData?.artists),
    album:  musicData?.song ? musicData?.song?.album?.name : musicData?.al?.name ||musicData?.album?.name  ,
    duration: formatSecond(musicData?.song?.duration || musicData?.dt||musicData?.duration),
    picUrl: musicData.coverImgUrl|| musicData?.al?.picUrl || musicData?.picUrl,
    playCount: musicData?.playCount || "",
    score: musicData?.score || "",
  };
};
