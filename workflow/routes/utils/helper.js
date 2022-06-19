var CONFIG = require('routes/config/config');
var mongoose = require('mongoose');
var fs = require('fs');
// const welcomeMsg = require("routes/config/saathiwelcomemsg");
function Helper(){
    this.merge_array = function(array1, array2) {
        var result_array = [];
        var arr = array1.concat(array2);
        var len = arr.length;
        var assoc = {};
    
        while(len--) {
            var item = arr[len];
    
            if(!assoc[item]) 
            { 
                result_array.unshift(item);
                assoc[item] = true;
            }
        }
    
        return result_array;
    }
    this.isKeyValueMatched = function(obj,key, val){
        let keys = Object.keys(obj);
        let index = keys.indexOf(key);
        if(index > -1 && obj[key] == val){
            return true;
        }else{
            return false;
        }
    }
    this.objectIdToStringArr = function(arr){
        let resArr = [];
        arr.forEach(function(objectId){
            resArr.push(objectId.toString());
        });
        return resArr;
    }
    this.getYesNoStr = function(num){
        if(num == "1"){
            return "Yes";
        }else if(num == "2"){
            return "No";
        }else{
            return num;
        }
    };
    this.haveAadhaarCardString = function(num){
        if(num == "1"){
            return "Yes";
        }else if(num == "2"){
            return "No";
        }else if(num == "3"){
            return "Yes, But don't want to share";
        }else{
            return num;
        }
    };
    this.getEducationStr = function(num){
        switch(num){
            case "1":
                return "Illiterate";
            break;
            case "14":
                return "Graduate";
            break;
            case "15":
                return "Post Graduate";
            break;
            default : 
                return num ? ( parseInt(num) - 1 ) : "";
            break;
        }
    };
    this.engagedWithLivelihoodActivityStr = function(num){
        switch(num){
            case "1":
                return "Farming";
            break;
            case "2":
                return "Animal husbandry";
            break;
            case "3":
                return "Anganwaadi";
            break;
            case "4":
                return "Teacher";
            break;
            case "5":
                return "ANM";
            break;
            case "6":
                return "Aasha Worker";
            break;
            case "7":
                return "Mobile recharge";
            break;
            case "8":
                return "Banking Correspondent";
            break;
            case "9":
                return "SHG Record Keeper";
            break;
            case "10":
                return "None of the above";
            break;
            case "11":
                return "Others";
            break;
            default : 
                return num;
            break;
        }
    };
    this.isObjectId = function(n) {
      return mongoose.Types.ObjectId.isValid(n);
    };

    // this.getSaathiWelcomeMsg = function(username,password,lng){
    //     let msg =  "";
    //     if(lng && welcomeMsg[lng]){
    //         msg += welcomeMsg[lng]["part1"] + username + welcomeMsg[lng]["part2"] + password + welcomeMsg[lng]["part3"];
    //     }else{
    //         lng = "en";
    //         msg += welcomeMsg[lng]["part1"] + username + welcomeMsg[lng]["part2"] + password + welcomeMsg[lng]["part3"];
    //     }
    //     return msg;
    // };


    // this.getBlockCoordinatorWelcomeMsg = function(username,password){
    //     let msg =  "";
    //     let lng = "en";
    //     msg += welcomeMsg[lng]["part1"] + username + welcomeMsg[lng]["part2"] + password;
    //     return msg;
    // };





    this.parseJson = function(val,key){
        if(val != null && val != ""){
            try{
                return JSON.parse(val);
            }catch(ex){
                return [];
            }
        }else{
            return [];
        }
    };
    this.getMongooseObjectArrayOfUniqueIds = function(arr){
        var ids = []; var tmpArr = [];
        arr.forEach(function(el){
            if(tmpArr.indexOf(el) == -1){
                tmpArr.push(el);
                ids.push(mongoose.Types.ObjectId(el));
            }
        });
        return ids;
    }
    this.stringifyIfArray =  function(val){
        if(Array.isArray(val)){
            try {
                return JSON.stringify(val);
            } catch (error) {
                return null;
            }
        }else{
            return null;
        }
    }
    this.deleteExceptThese = function (obj,keyArr) {
        var ptkeys = Object.keys(obj);
        ptkeys.forEach(function(pKey) {
            if (keyArr.indexOf(pKey) !== -1){
                delete obj[pKey];
            }
        });
        return obj;
    }
    this.getArrayKeywise = function(arr,keys){
        var data = {};
        keys.forEach(function(k){
            data[k] = [];
            arr.forEach(function(ele){
                data[k].push(ele[k]);
            })
        });
        return data;
    }
    this.getIndexArrayOfKey = function(arr,key){
        var data = [];
        arr.forEach(function(ele){
            data.push(ele[key]);
        });
        return data;
    }
    this.validateKeys = function(keyArr,obj){
        const helperObj = new Helper();
        keyArr.some(function(k){
            if( !( (k in obj) && helperObj.isValidString(obj[k]) ) ){
                return false;
            }
        });    
        return true;    
    }
    this.isValidString = function(str,minCharCount = 1){
        if(str == undefined || str.length == 0 || str.length < minCharCount){
            return 0;
        }else{
            return 1;
        }
    }
    this.findKeyByValueInObject = function (obj,val) {
        var ptkeys = Object.keys(obj); var key;
        ptkeys.forEach(function(pKey) {
            if(obj[pKey] == val){
                key =  pKey;
            }
        });
        return key;
    }
    this.getStringInObjectArrayOfGivenKey = function (array,givenKey) {
        var ansArr = [];
        array.forEach(function (element,index) {
            var refAddr = JSON.parse(JSON.stringify(element));
            var keys = Object.keys(refAddr);
                        // console.log(keys);

            keys.forEach(function(pKey) {
                //console.log(pKey == givenKey, "pKey ::: ",pKey ,"givenKey :: ",givenKey)
                if(pKey == givenKey){
                    ansArr.push(element[givenKey]);
                }
            });
        });
        return ansArr.toString();
    }
    this.compareAndCreateNewArray = function (childArr, parentArr,cmpKey) {
        childArr.forEach(function (childElement,cIndex) {
           parentArr.forEach(function (parentElement) {
               if(childElement[cmpKey] == parentElement["_id"]){
                   childArr[cIndex][cmpKey] = parentElement["name"];
               }
           });
        });
        return childArr;
    }
    this.removeKeys = function(obj,keys){
        keys.forEach(e => delete obj[e]);
        return obj;
    }
    this.createObjectFromStructure = function(element,structureObj){
        var ptkeys = Object.keys(structureObj);
        ptkeys.forEach(function(pKey){
            element[pKey] = {};
            var chKeys = Object.keys(structureObj[pKey]);
            chKeys.forEach(function(cKey){
                element[pKey][cKey] = element[structureObj[pKey][cKey]];
                // if(cKey == "profile_pic"){
                //     element[pKey][cKey] = CONFIG.hostname+"/"+element[structureObj[pKey][cKey]];
                // }else{
                //     element[pKey][cKey] = element[structureObj[pKey][cKey]];
                // }
                delete element[structureObj[pKey][cKey]];
            })
        })
        return element;
    }
    this.objectArrayToIndexArray =  function(arr,key){
        var nArr = [];
        arr.forEach(function(obj){
            if(obj[key] != undefined){
                nArr.push(obj[key]);
            }
        });
        return nArr;
    }
    this.fileExist = function(filename,dir){
        var d = false;
        switch(dir){
            case "impact-stories" :
                d = "impact-stories/"+filename;
                break;
            case "profile_pic" :
                d = "profile_pic/"+filename;
                break;
            case "groups" :
                d = "groups/"+filename;
                break;
            default :
                d = false;
                break;
        }
        if(d){
            fs.stat("public/"+d, function(err, stat) {
                if(err == null) {
                    return CONFIG.hostname+"/"+d;
                } else {
                    return CONFIG.default_profile_pic;
                }
            });
        }

    };
    this.findByUniqueKey = function(arr,key,callback){
        if(Array.isArray(arr)){
            arr.forEach(function(element){
                if(element[key] != undefined){
                    return callback(element[key]);
                }else {
                    var keys = Object.keys(element);
                    keys.forEach(function(k){
                        if(Array.isArray(element[k])){
                            var h = new Helper();
                            h.findByUniqueKey(element[k],key,callback);
                        }
                    });
                }
            });
        }
    }
    this.mergeFormDataInFormStructure = function (formData,formStructure,lng) {
        var FormDataArr = [];
        var helperObj = new Helper();
        var questionEnglish = helperObj.getElementIfKeyValueMatched(formStructure.language,"lng",lng);
        formData.forEach(function (singleData,index) {
            var formDataObj = {
                _id : formStructure._id,
                formId : formStructure.formId,
                version : formStructure.version,
                formIcon : formStructure.formIcon,
                title : questionEnglish.title
            };
            formDataObj["question"] = [];
            formDataObj["formDataFormUniqueId"] = singleData.formUiniqueId;
            var questions = singleData["question"];
            questions.forEach(function (question,ind) {
                var singleFormStrObj = Helper.getElementIfKeyValueMatched(questionEnglish.question,"order",question.order);
                console.log("answer_option ::::: ",singleFormStrObj.answer_option)
                formDataObj.question.push({
                    _id : singleFormStrObj._id,
                    title : singleFormStrObj.title,
                    value : question.answer
                });

            });
            FormDataArr.push(formDataObj);
        });
        return FormDataArr;
    };
    this.getElementIfKeyValueMatched = function(arr,key,value){

        var obj = false;

        arr.forEach(function(el,index){
            if(el[key] == value){
                obj = el;
            }
        });
        return obj;
    }
    this.getElementIfKeyValueMatchedObjectId = function(arr,key,value){
        var obj = false;
        arr.forEach(function(el,index){
            if(el[key].toString() == value.toString()){
                obj = el;
            }
        });
        return obj;
    }
    this.getSelectedLanguage = function(userLang,formLanguage){
        var elArr = [];
        userLang.forEach(function(el,index){
            formLanguage.forEach(function(e){
                if(el.code == e.lng){
                    elArr.push(e);
                }
            });
        });
        return elArr;
    }

    this.toObject = function(arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
          rv = arr[i];
        return rv;
      }
}
module.exports = new Helper();