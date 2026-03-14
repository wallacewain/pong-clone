import fs from 'fs';
import zlib from 'zlib';

function makePNG(size) {
  const pixels = Buffer.alloc(size * size * 4);
  for (let i = 0; i < size * size; i++) pixels[i * 4 + 3] = 255; // alpha

  function setWhite(x, y) {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 4;
    pixels[i] = pixels[i + 1] = pixels[i + 2] = 255;
  }

  // paddles
  const pw = Math.round(size * 0.05), ph = Math.round(size * 0.35);
  const px1 = Math.round(size * 0.08), py1 = Math.round((size - ph) / 2);
  const px2 = size - px1 - pw;
  for (let y = py1; y < py1 + ph; y++)
    for (let x = px1; x < px1 + pw; x++) { setWhite(x, y); setWhite(px2 + (x - px1), y); }

  // ball
  const br = Math.round(size * 0.06);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++)
      if ((x - size/2)**2 + (y - size/2)**2 <= br**2) setWhite(x, y);

  const SIG = Buffer.from([137,80,78,71,13,10,26,10]);
  const T = new Uint32Array(256);
  for (let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;T[n]=c;}
  function crc32(b){let c=0xffffffff;for(let i=0;i<b.length;i++)c=T[(c^b[i])&0xff]^(c>>>8);return(c^0xffffffff)>>>0;}
  function chunk(type,data){
    const len=Buffer.alloc(4);len.writeUInt32BE(data.length);
    const t=Buffer.from(type),crc=Buffer.alloc(4);
    crc.writeUInt32BE(crc32(Buffer.concat([t,data])));
    return Buffer.concat([len,t,data,crc]);
  }

  const ihdr=Buffer.alloc(13);
  ihdr.writeUInt32BE(size,0);ihdr.writeUInt32BE(size,4);ihdr[8]=8;ihdr[9]=6;

  const raw=Buffer.alloc(size*(size*4+1));
  for(let y=0;y<size;y++){raw[y*(size*4+1)]=0;pixels.copy(raw,y*(size*4+1)+1,y*size*4,(y+1)*size*4);}

  return Buffer.concat([SIG,chunk('IHDR',ihdr),chunk('IDAT',zlib.deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]);
}

fs.writeFileSync('icon-192.png', makePNG(192));
fs.writeFileSync('icon-512.png', makePNG(512));
console.log('Icons generated.');
