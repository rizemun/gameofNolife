function users() {
    this.a = 10;

    return function user(connection) {
        this.result=[];

        this.promise1 = new Promise(function(resolve,reject){

            connection.query('SELECT * FROM user', function (err, res, fields) {
                if (err) throw err;
                resolve(res);
            });
        });
        //
        // promise1.then((value)=>{
        //     this.result = value;
        //
        //     // console.log(this.result);
        // });

        this.b = 8;
        return this;
    }
}

module.exports = users();