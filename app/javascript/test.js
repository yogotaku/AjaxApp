window.addEventListener('load', () => {
  const hello = undefined || 100 || 0 || NaN || '' || 'Hello!'; const chao = "22222" && '33333' && 100 && [] && {} && 'Chao!';

  console.log(hello);
  console.log(chao);
})