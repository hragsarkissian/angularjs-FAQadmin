# angularjs-FAQadmin
The following controller represents the functionality of inserting, updating, receiving,and deleting data from the database using AngularJs.

(function() {
    "use strict";
    
    angular
        .module("adminApp.faq")
        .component("faqDetail", {
            templateUrl: "/app/admin/modules/faq/faqDetail.html",
            controller: "faqController"       
        })
})();
(function() {
    "use strict";

    angular
        .module("adminApp.faq")
        .controller("faqController", FaqController);

    FaqController.$inject = ["$scope", "$location", '$element', 'faqService'];

    function FaqController($scope,$location,$element,FaqService) {
        var vm = this;
        // viewmodels for show and hide
        vm.createFaq = false;
        vm.addfaqCategory = false;
        vm.dialog = false;
        vm.editfaq = false;
        vm.faqheader = true;
        vm.isSuccessfull = true;
        //viewmodels for two way binding
        vm.newCategory = {};
        vm.edit = {};
        vm.newQuestion = {};
        vm.$onInit = _onInit;
        vm.$location = $location;
        //view models for getcalls
        vm.faqitem = [];
        vm.faqCategory = [];
        //viewmodel for faq getall category ajax call
        vm.getfaqCategory = _getfaqCategory;
        //viewmodel for getall faq ajax call
        vm.getfaq = _getfaq;
        //viewmodel for creating question ajax call
        vm.createQuestion = _createQuestion;
        //viewmodel for delete faq ajax call
        vm.deleteQuestion = _deleteQuestion;
        //viewmodel for opening edit faq form by doing getById ajax call
        vm.editQuestion = _editQuestion;
        vm.editQuestionSuccess = _editQuestionSuccess;
        vm.editQuestionError = _editQuestionError;
        //viewmodel for update faq ajax call
        vm.updateQuestion = _updateQuestion;
        //viewmodel for delete faq category ajax call
        vm.deleteCategory = _deleteCategory;
        //viewmodel for new faq category form
        vm.createCategory = _createCategory;
        //viewmodel for creating new faq category ajax call 
        vm.createNewFaq = _createNewFaq;
        //viewmodel for new question form
        vm.openQuestionForm = _openQuestionForm;

        function _onInit(){
            console.log("Faq Controller Fired");
            vm.getfaqCategory();
            vm.getfaq();
        }

        function _getfaqCategory(){
            return FaqService.getfaqCategory()
                .then(function(data){
                    vm.faqCategory = data.items;
                        console.log(vm.faqCategory);
            })         
        }

        function _getfaq(){
            return FaqService.getfaq()
                .then(function(data){
                    vm.faqitem = data.items;
                })         
        }

        function _deleteQuestion(id){
            vm.id = id;
            return FaqService.deleteQuestion(id)
                .then(function(){
                    var index = vm.faqitem.findIndex(x=>x.id === id);
                    vm.faqitem.splice(index, 1);
                })
        }

        function _editQuestion(id){
            return FaqService.getByIdFaq(id)
                .then(vm.editQuestionSuccess,vm.editQuestionError);        
        }

        function _editQuestionSuccess(data){
            vm.edit = data.item;
            vm.faqheader = false;
            vm.isSuccessfull = false;
            vm.editfaq = true;
            vm.edit.id = data.item.id
        }

        function _editQuestionError(err){
            return err;
        }

        function _updateQuestion() {
            vm.id = vm.edit.id
            return FaqService.updateQuestion(vm.id,vm.edit)
                .then(function(data){
                    var index = vm.faqitem.findIndex(x=>x.id === vm.id);
                    vm.faqitem.splice(index, 1 , vm.edit);         
                    vm.isSuccessfull = true;
                    vm.editfaq = false;
                    vm.faqheader = true;
                })
        }

        function _deleteCategory(id){
            return FaqService.deleteCategory(id)
                .then(function(data){
                    if(data.statusText === 'Bad Request'){
                        vm.dialog = true;
                    }else{
                        var index = vm.faqCategory.findIndex(x=>x.id === id);
                        vm.faqCategory.splice(index, 1);           
                    }             
                });
        }

        function _createCategory(){
            vm.isSuccessfull = false;
            vm.faqheader = false;
            vm.addfaqCategory = true;
        }

        function _createNewFaq(){
            console.log(vm.newCategory);
            return FaqService.createNewFaq(vm.newCategory)
                .then(function(data){
                    vm.faqCategory.push(vm.newCategory);
                    console.log(vm.faqCategory);
                    vm.isSuccessfull = true, 
                    vm.faqheader = true, 
                    vm.addfaqCategory = false;           
                })
        }

        function _openQuestionForm(id){
            vm.isSuccessfull = false;
            vm.faqheader = false;
            vm.createFaq = true;
            vm.newQuestion.faqCategoryId = id;
        }

        function _createQuestion(){
            return FaqService.createQuestion(vm.newQuestion)
                .then(function(data){
                    vm.newQuestion.id = data.item;
                    vm.faqitem.push(vm.newQuestion);
                    console.log(vm.faqitem);
                    vm.isSuccessfull = true;
                    vm.faqheader = true;
                    vm.createFaq = false;
                })
        }   
    }
})();
