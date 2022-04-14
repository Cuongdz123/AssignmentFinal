// document.getElementById("showcart").style.display = "none";
var k = 0;
var hinh = [];
var vth = 0;
for (var i = 0; i < 8; i++) {
    hinh[i] = new Image();
    hinh[i].src = "./img/anh" + i + ".png";
}

function loadAnh() {
    var t = document.getElementById("slideshow");
    t.src = hinh[k].src;
    if (k == 7) {
        k = 0;
    } else {
        k++;
    }
    document.getElementById("soanh").innerHTML = k + 1 + "/8";
}

function next() {
    if (k == 7) {
        k = 0
    } else {
        k++;
    }
    var hinhh = document.getElementById("slideshow");
    hinhh.src = hinh[k].src;
    document.getElementById("soanh").innerHTML = k + 1 + "/8";

}

function back() {
    if (k == 0) {
        k = 7
    } else {
        k--;
    }
    var hinhb = document.getElementById("slideshow");
    hinhb.src = hinh[k].src;
    document.getElementById("soanh").innerHTML = k + 1 + "/8";

}

var arrsp = new Array();

function themvaogiohang(x) {
    var nodeSP = x.parentElement.children;
    var hinh = nodeSP[0].children[0].src;
    var gia = nodeSP[1].children[0].innerText;
    var ten = nodeSP[2].innerText;
    var soluong = nodeSP[3].value;
    var spdm = [hinh, ten, gia, soluong];

    arrsp.push(spdm);
    sessionStorage.setItem("giohanght", JSON.stringify(arrsp));
    demsoluongsp();


    // console.log(arrsp);

}



function demsoluongsp() {
    var a = arrsp.length;
    document.getElementById("countsp").innerText = a;
}

function showcart() {
    var x = document.getElementById("showcart");
    // if(x.style.display == none){
    //     x.style.display = "block";
    // }else{
    //     x.style.display = "none";
    // }
    showmycart();
}

function xoa(x) {
    var xoa = x.parentElement.parentElement;
    xoa.remove();
}

function tinhlaidon(x) {
    var gh_str = sessionStorage.getItem("giohanght");
    var giohang = JSON.parse(gh_str);
    var tr = x.parentElement.parentElement;
    console.log(tr);
    var dg = parseInt(tr.children[3].innerHTML);
    console.log(dg);
    var tt = 0;
    var sl = Number(tr.children[4].children[0].value);
    console.log(sl);
    var td = document.getElementById("tongtien").innerHTML;
    console.log(td);
    var tongdon = 0;
    // console.log(sl);

    var tensp = tr.children[2].innerText;
    if (sl == null) {
        dongy = confirm("xóa sản phẩm khỏi giỏ hàng. OK?");
        // Xoa tren giao dien
        if (dongy == true)
            tr.remove();
        // Xoa sp khoi mang
        for (let i = 0; i < giohang.length; i++) {
            if (giohang[i][1] == tensp) {
                giohang.splice(i, 1);
            }
            console.log(...giohang);
        }
    } else {
        for (let i = 0; i < giohang.length; i++) {
            if (giohang[i][1] == tensp) {
                giohang[i][3] = Number(sl);
            }
        }
        tt = Number(dg) * Number(sl);
        tr.children[5].innerHTML = tt;
    }
    var h = document.querySelectorAll("#tt");
    for (let i = 0; i < h.length; i++) {
        tongdon += Number(h[i].innerText);
    }
    document.getElementById("tongtien").innerText = tongdon;
    console.log(tongdon);
    sessionStorage.setItem("giohanght", JSON.stringify(giohang));
}

function stt(){
    var stt = document.querySelectorAll("#stt");
    for(var i=0;i<stt.length;i++){
        stt[i].innerText=(i+1);
    }
}

function showmycart() {
    var b = sessionStorage.getItem("giohanght");
    var c = JSON.parse(b);
    var ttgh = "";
    var tongtt = 0;
    for (let i = 0; i < c.length; i++) {
        var tt = Number(c[i][2]) * Number(c[i][3]);
        tongtt += tt;
        ttgh += `
        <tr>
            <td id="stt">${i + 1}</td>
            <td> <img src = '${c[i][0]}'></td>
            <td>${c[i][1]}</td>
            <td>${c[i][2]}</td>
            <td><input type="number" onchange="tinhlaidon(this)" value = "${c[i][3]}" min = "0"></td>
            <td id="tt">${tt}</td>
            <td><button onclick = "xoa(this); tinhlaidon(this)">Xóa</button></td>
        </tr>
        `
    }
    ttgh += `
            <tr>
                <td colspan = '5'>TỔNG</td>
                <td id = "tongtien">${tongtt}</td>
            </tr>
        `
    document.getElementById("mycart").innerHTML = ttgh;
}

function tinhlaitien(x){
    var tr = x.parentElement.parentElement;
    tr
}