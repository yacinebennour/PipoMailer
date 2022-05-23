
// //Libraries tht we need
var nodemailer = require('nodemailer');
var fs = require('fs');

var increment = 0; // to stop the timer fucntion/limit emails sent



    function showTwo()  {
        var twoShow = document.getElementById("two");
        twoShow.style.display = "block";
    }

    function showSubject()  {
        var subjectShow = document.getElementById("Subject");
        subjectShow.style.display = "block";
    }

    function showBody()  {
        var bodyshow = document.getElementById("body");
        bodyshow.style.display = "block";
    }

    function showLog()  {
        var logShow = document.getElementById("three");
        logShow.style.display = "block";
    }


    function loginfunc() {

        credential.setUser = document.getElementById("userName").value;
        
        credential.setPass = document.getElementById("passWord").value;

        credentials();
    };

    var credential = {

        get getUser() {
            return this.userName;
        },
        get getPass() {
            return this.passWo;
        },
        set setUser(uName) {
            this.userName = uName;
        },
        set setPass(passW) {
            this.passWo = passW;
        }
    };

    function credentials() {

        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user : credential.getUser,
                pass : credential.getPass,
            }
        });

        transporter.verify(function(error, success) {
            if (error) {
                console.log("Failed Login");
                document.getElementById("loginStatus").innerHTML = "Login Unsuccessful; Check Credentials";
                
            } else {
                console.log("Good Login");
                showTwo();
                document.getElementById("loginStatus").innerHTML = "Login Successful; Continue To Next Step";
            }
        });

    }

    function fileParser(val) {

        var num = val;

        if (num == 0)  {
            var filePath = document.getElementById("myFile").files[0].path;
            document.getElementById("pathF").innerHTML = filePath;

            
            fs.readFile(filePath, 'utf-8', (err, data) => {    
            
                if (err) 
                    console.log(err);
                else {

                    const regex = /\b$/gm;
                    const str = data;
                    const subst = `,`;

                    // The substituted value will be contained in the result variable
                    const result = str.replace(regex, subst);


                    showSubject();
                    showBody();
           
                }
            });

        } else if ( num == 1)  {
            var subjectE = document.getElementById("subje").value;
            var bodyE = document.getElementById("bod").value;

            if (subjectE == '')   {
                console.log("write subject");
                alert("**ENTER SUBJECT**");
            } else if (bodyE == '') {
                console.log("write body");
                alert("**ENTER BODY**");
            } else {
                console.log("all clear both are cool");
                var filePath = document.getElementById("myFile").files[0].path;
                document.getElementById("pathF").innerHTML = filePath;
                    
                fs.readFile(filePath, 'utf-8', (err, data) => {      
                    if (err) 
                        console.log(err);
                    else {
                        
                        const regex = /\b$/gm;
                        const str = data;
                        const subst = `, `;

                        // The substituted value will be contained in the result variable
                        const result = str.replace(regex, subst);

                        console.log('Substitution result: ', result);

                        var path = process.argv[2];    
                        var text = fs.readFileSync(filePath).toString();
                        var lines = text.split('\n');
                        var newlines_count = lines.length;



                        showSubject();
                        showBody();
                        showLog();
                        
                        const mailOptions = {
                            from: credential.getUser, // sender addresss
                            to: result, // list of receivers
                            subject: subjectE,  // Subject line
                            html: bodyE// plain text body
                        };

                        transporter.sendMail(mailOptions, function (err, info) {
                            if(err) {
                                console.log(err);
                            } else {
                                var countDec = newlines_count ;
                                var countDe3c = newlines_count - 1;
                                for ( var u = 1; u <= newlines_count; u++ ) {
                                    document.getElementById("texArea").value += "Email Sent " + countDec + " to " + lines[countDe3c] + "\n";
                                    countDec--;
                                    countDe3c--;
                                    
                                }

                            }
                                
                        });

                    };
                }); // end of fucntion fileParser
        
            };
        };
    };


