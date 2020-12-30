//オブジェクトについて
const obj = {
  name: "yogo",
  age: 26,
  greet(greet) {
    console.log(greet)
  }
}

obj.greet("hello");
obj.age = 18;
console.log(obj.age);


//クラスについて
class Bird { 
  constructor(name) {
    this.name = name; 
  }
  
  chirp=()=>{
    console.log(`${this.name}が鳴きました`);
  };

  static explain = (name) => {
    console.log(`${name}は翼があって卵を生みます`);
  };
}

class FlyableBird extends Bird {
  constructor(name) {
    super(name);
  }
  fly=()=>{
    console.log(`${this.name}が飛びました`);
  };
}

//プロトタイプベース
function Bird(name) {
  this.name = name;
  this.chirp = function () {
    console.log(`${this.name}が鳴きました`);
  };
  return this;
}

Bird.explain = function (name) {
  console.log(`${name}は翼があって卵を生みます`);
};

function FlyableBird(name) {
  Bird.call(this, name);
  this.fly = function () {
    console.log(`${this.name}が飛びました`);
  };
  return this;
}

FlyableBird.prototype.__proto__ = Bird.prototype;

//実際の書き換え
class Item {
  constructor(item) {
    this.id = item.id;
    this.content = item.content;
    this.isChecked = item.checked;
    this.created_at = item.created_at;
  }

  buildHtml = () => `
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

const getFormData = () => new FormData(document.getElementById("form"));

const sendFormData = (formData) => {
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
}

window.addEventListener("turbolinks:load", () => {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", () => {
    sendFormData(getFormData());
  })
});