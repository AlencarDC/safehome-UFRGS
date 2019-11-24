class Foo {
    public static bar() {
        if (true) {
          return true;
        } else {
          return false;
        }
      }
      
      public static async barAsync() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (true) {
              resolve(true);
            } else {
              resolve(false);
            }
          }, 1000);
        });
      }  
}

export default Foo;