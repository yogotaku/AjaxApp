function check() {
  const posts = document.getElementsByClassName("post");
  postsA = Array.from(posts);
  
  postsA.forEach(function(post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");


    //////投稿をクリックしたとき//////
    post.addEventListener('click', (e) => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);  // 送信先を指定
      XHR.responseType = "json";  // 受け取るデータタイプを指定 
      XHR.send();   // データ送信
      XHR.onload = () => {
        ////// レスポンスがエラーだった場合 //////
        if (XHR.status != 200) { 
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        }

        const item = XHR.response.post;  // コントローラーから送られてきたデータ｛ post: item｝を取得
        ////// レスポンスが正常な場合 //////
        if (item.checked === true) {   // 厳密な比較。==と違い、型も同じでなければならない
          post.setAttribute("data-check", "true"); // 既読の場合はdata-check属性をtrueにする
        } else if (item.checked === false) {
          post.removeAttribute("data-check"); // 未読の場合はdata-checkごと削除
        }
      }
      XHR.onerror = () =>  {
        alert("Request failed");
      }

      e.preventDefault();
    });
  });
}
setInterval(check, 1000);