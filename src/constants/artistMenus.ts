export const  artistAreaMenus = [
  {
    name:"全部",
    area:-1,
    activity:true
  },
  {
    name:"华语",
    area:7,
    activity:false
  },
  {
    name:"欧美",
    area:96,
    activity:false
  },
  {
    name:"日本",
    area:8,
    activity:false
  },
  {
    name:"韩国",
    area:16,
    activity:false
  },
  {
    name:"其他",
    area:0,
    activity:false
  },
]

export const artistTypeMenus = [
  {
    name:'全部',
    type:-1,
    activity:true
  },
  {
    name:'男歌手',
    type:1,
    activity:false
  },
  {
    name:'女歌手',
    type:2,
    activity:false
  },
  {
    name:'乐队',
    type:3,
    activity:false
  },
]
var initalPart = []
for (let i = 65; i < 91; i++) {
let obj = {name:'',initial:'',activity : false};
 obj.name = String.fromCharCode(i)
 obj.initial =String.fromCharCode(i+32)
 initalPart.push(obj)
 
}

export const artistInitialMenus = [
  {
    name:'热门',
    initial:-1,
    activity:true
  },
  ...initalPart,
  {
    name:'其他',
    initial:0,
    activity:false
  },
]