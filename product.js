var coursework = new Vue({
    el: "#app",
    data: {
        sitname: "After school Activity",
        input: "",
        product: [],
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
        cartPrice: 0,
        order: {
          name: "",
          number: ""
        }
    },
    methods: {
        addToCart(course) {
          if (course.spaces > 0) {
            if(this.cart.indexOf(course) != -1){
              course.amountInCart++;
              //this.cart.push(course);
              course.spaces--;
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
        async sendCart(){
          let data = {
            info: this.order,
            order: this.cart,
          }
         try {
            let sendOrder = await  fetch('https://backendcw2.herokuapp.com/collection/order', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              mode: "cors",
              cache: "no-store",
              body: JSON.stringify(data),
          })
            let res = await sendOrder
            if(res !== null){
               this.cart.forEach(element => {
                 this.product.forEach(ele => {
                   if(element._id == ele._id){
                     let spaceUpdate = ele.spaces - element.amountInCart
                     let newSpace = {
                       spaces: spaceUpdate
                     }
                     fetch('https://backendcw2.herokuapp.com/collection/order/'+element._id, {
                        method: 'PUT',
                        body: JSON.stringify(newSpace),
                    })
                        .then(response => response.json())
                        .catch((error) => {
                            console.log(error);
                        });
                   }
                 })
               });
            }
         } catch (error) {
           console.log(error);
         }
        },
        async searching() {
          try {
            let serachResult = await fetch('https://backendcw2.herokuapp.com/collection/product/search?q='+this.input)
            this.product = await serachResult.json()
          } catch (error) {
            console.log(error);
          }
        },
    
        removeFromCart(course) {
          course.amountInCart--;
          course.totalPrice = course.Price * course.amountInCart
          this.total += course.price;
          course.spaces++;
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
        async getAllLesson(){
          try {
              const lesson = await fetch('https://cw2backend.herokuapp.com/collection/product')
              this.product =  await lesson.json()   
          } catch (error) {
              console.log(error);
          }
        }
      },
      mounted(){
        this.getAllLesson();
      },
      
})