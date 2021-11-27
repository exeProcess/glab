var coursework = new Vue({
    el: "#app",
    data: {
        sitname: "After school Activity",
        input: "",
        product: [
            {
                id: 1,
                Subject: "Economics",
                Location: "Dubai",
                Price: 2700,
                space: 5,
                img: "https://img.icons8.com/external-flatart-icons-outline-flatarticons/100/000000/external-economics-business-flatart-icons-outline-flatarticons.png"
            },
            {
                id: 2, 
                Subject: "Agriculture",
                Location: "Nigeria",
                Price: 2700,
                space: 5,
                img: "https://img.icons8.com/external-icongeek26-glyph-icongeek26/100/000000/external-agriculture-agriculture-icongeek26-glyph-icongeek26.png"
            },
            {
                id: 3,
                Subject: "Music",
                Location: "London",
                Price: 2700,
                space: 5,
                img: "https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/100/000000/external-music-player-social-media-vitaliy-gorbachev-lineal-vitaly-gorbachev.png"
            },
            {
                id: 4,
                Subject: "Abacus",
                Location: "Honk kong",
                Price: 2700,
                space: 5,
                img: "https://img.icons8.com/external-itim2101-fill-itim2101/100/000000/external-abacus-calculate-itim2101-fill-itim2101.png"
            },
            {
                id: 5,
                Subject: "Language",
                Location: "Brunei",
                Price: 2700,
                space: 5,
                img: "https://img.icons8.com/ios-filled/100/000000/language.png"
            },
            {
                id: 6,
                Subject: "Geography",
                Location: "Dubai",
                Price: 2700,
                space: 5,
                img: "https://img.icons8.com/external-flatart-icons-outline-flatarticons/100/000000/external-geography-geography-flatart-icons-outline-flatarticons.png"
            },
            {
                id: 7,
                Subject: "Biology",
                Location: "Dubai",
                Price: 2700,
                space: 5,
                img: "https://img.icons8.com/external-neu-royyan-wijaya/100/000000/external-biology-neu-medical-neu-royyan-wijaya.png"
            },
            {
                id: 8,
                Subject: "Mathematics",
                Location: "Canada",
                Price: 2700,
                space: 5,
                img: "https://img.icons8.com/external-becris-lineal-becris/100/000000/external-maths-data-science-becris-lineal-becris.png"
            },
            {
                id: 9,
                Subject: "Physics",
                Location: "Canada",
                Price: 2700,
                space: 5,
                img: "https://img.icons8.com/ios-filled/100/000000/physics.png"
            },
            {
                id: 10,
                Subject: "Chemistry",
                Location: "Mumbai",
                Price: 5400,
                space: 5,
                img:"https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/100/000000/external-chemistry-school-and-learning-flatart-icons-lineal-color-flatarticons.png"
            },
        ],
        filters: [
          {
            id: 1,
            name: "Subject",
            checked: true,
          },
          {
            id: 2,
            name: "Location",
            checked: false,
          },
          {
            id: 3,
            name: "Price",
            checked: false,
          },
          {
            id: 4,
            name: "Availability",
            checked: false,
          },
        ],
        secondary_filters: [
          {
            id: 1,
            name: "Ascending",
            sign: "",
            checked: true,
          },
          {
            id: 2,
            name: "Descending",
            checked: false,
            sign: "-",
          },
        ],
        cart: [],
        total: [],
        cartPrice: 0
    },
    methods: {
        addToCart(course) {
          if (course.space > 0) {
            if(this.cart.indexOf(course) != -1){
              course.amountInCart++;
              //this.cart.push(course);
              course.space--;
              this.total.push(course.Price)
              this.total.map(e => {
                this.cartPrice += e
              })
              console.log(this.total);
            }else{
              course.amountInCart = 1;
              course.totalPrice = course.Price
              this.cart.push(course);
              course.space--;
              this.total.push(course.Price)
              this.total.map(e => {
                this.cartPrice += e
              })
              console.log(this.total);
            }
          }
        },
        
        searching() {
    
          $(".card").each((i, ele) => {
            let filterableText = "";
            let hide = false;
            $(ele).addClass("d-none");
    
            $(ele)
              .find(".filterable-attribute")
              .each((i, ele2) => {
                filterableText +=
                  " " + ele2.innerText.toLowerCase().replace(/\s\s+/g, " ");
              });
    
            show = filterableText.includes(this.input);
    
            if (show) {
              console.clear();
              $(ele).removeClass("d-none");
            }
          });
        },
    
        removeFromCart(course) {
          course.amountInCart--;
          course.totalPrice = course.Price * course.amountInCart
          this.total += course.price;
          course.space++;
        },
        deleteFromCart(course){
          let id = this.cart.indexOf(course);
          this.cart.splice(id,1)
          course.space = 5;
        },
    
        resetVariable() {
          this.cart = [];
          this.total = 0;
        },
    
        checkout() {
          let msg = `Thanks ${this.person.name} for buys from out store.. (£ ${this.total})`;
          alert(msg);
          this.resetVariable();
        },
    
        stopNumericInput(event) {
          let keyCode = event.keyCode ? event.keyCode : event.which;
          if (keyCode > 47 && keyCode < 58) {
            event.preventDefault();
          }
        },
    
        stopAlphabetsInput(event) {
          let keyCode = event.keyCode ? event.keyCode : event.which;
          console.log(keyCode);
          if (keyCode >= 48 && keyCode <= 58) {
            // Allow
          } else {
            event.preventDefault();
          }
        },
    
        dynamicSort(property) {
          var sortOrder = 1;
          if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
          }
          return function (a, b) {
            var result =
              a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
            return result * sortOrder;
          };
        },
    
        toggleMainFilter(filter) {
          this.filters.map((e) => {
            e.checked = false;
            if (e == filter) {
              // Change State
              e.checked = true;
    
              this.applyFilter();
            }
          });
        },
    
        toggleSecondaryFilter(sfilter) {
          this.secondary_filters.map((e) => {
            e.checked = false;
            if (e == sfilter) {
              // Change State
              e.checked = true;
    
              this.applyFilter();
            }
          });
        },
    
        applyFilter() {
          let sign = this.secondary_filters.filter((obj) => {
            return obj.checked;
          })[0].sign;
    
          let filter = this.filters
            .filter((obj) => {
              return obj.checked;
            })[0]
            .name.toLowerCase();
    
          if (filter == "availability") {
            filter = "spaces";
          }
    
          this.lessons = this.lessons.sort(this.dynamicSort(sign + filter));
        },
    },
})