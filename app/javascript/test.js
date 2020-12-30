class Item {
  constructor(item) {
    this.id = item.id;
    this.content = item.content;
    this.isChecked = item.checked;
    this.created_at = item.created_at;
  }

  buildHtml = () =>`
                    <div class="post" data-id=${this.id}>
                      <div class="post-date" >
                        投稿日時:${this.created_at}
                      </div>
                      <div class="post-content">
                        ${this.content}
                      </div>
                    </div> 
                  `;

  appendHtmlToList = (html) => {
    const list = document.getElementById("list");
    list.insertAdjacentHTML("afterend", html);
  };
}

function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json"
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      }
      const item = new Item(XHR.response.post);
      const html = item.buildHtml();
      item.appendHtmlToList(html);
      document.getElementById("content").value = "";
    }

    XHR.onerror = () => {
      alert("Request failed");
    }

    e.preventDefault();
  })
}
window.addEventListener("load", memo);

//タイムゾーン




