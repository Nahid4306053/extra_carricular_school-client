const handleorder = (items, datalenth) => {        
                    let orderArray = [];
                    for (let s = items; s < datalenth; s = s + (items + items) ) {
                      for (let m = s; m < s+items; m++) {
                          orderArray.push(m+1)
                      }
                    }
                    return orderArray
                  };
export {handleorder }