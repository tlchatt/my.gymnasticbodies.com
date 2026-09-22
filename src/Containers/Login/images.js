const images = [
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/_1030208.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/_1030713.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/_1070532.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/_1080127.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/_1080180.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/_1080199.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/_1080259.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/_1080391.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/bridge.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/chinhang.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/double+straddle.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/doublelever.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/half+lever.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/older-dislocates.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/P1000725.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/pikestretch.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/pseudoPlanchePushUp.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/StraddlePlanche_TuckPlanche_EricDaye.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/Stu+Jotham+-+IMG_6680+edited.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/DSC_9761.jpg',
  'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/2020-login/allan-cross-crop.jpg'
]

// when called it will return a random image from thw array above

export default function randomIntFromInterval(min = 0, max = 20) {
  return images[Math.floor(Math.random() * (max - min + 1) + min)];
}
