# DEV
truffle yuklenir `npm i truffle -g`

ipfs.sh ile ipfs docker uzerinde localde calistirilir
ganache yuklenir ve yeni proje olusturulur

src icinde `truffle deploy` yapilir ve deploy edilen adres confige yerlesitirilir

## metamask uzerine ganache agi eklenir
- network host: 127.0.0.1:7545
- network id: 1337
- network symbol: ETH
metamask uzerine ganache deki address'lerden biri import edilir

`npm run start` ile dev server acilir

acilan pencereden cüzdani bagla ile metamask uygulamaya baglanilir
uye olunur
post atilir

# PROD
npm run build