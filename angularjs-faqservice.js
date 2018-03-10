(function (){
    'use strict';
    
    angular.module("adminApp")
        .factory("faqService", FaqService);

    FaqService.$inject = ['$http', '$q'];

    function FaqService($http, $q){
        return{
            getfaqCategory: _getfaqCategory,
            getfaq: _getfaq,
            deleteQuestion: _deleteQuestion,
            getByIdFaq : _getByIdFaq,
            updateQuestion: _updateQuestion,
            deleteCategory : _deleteCategory,
            createNewFaq : _createNewFaq,
            createQuestion : _createQuestion
        }
        function _success(resp){
            return resp.data;
        }
        function _error(err){
            return err;
        }
        
        function _getfaqCategory() {
            return $http.get(
                "http://rockstarlabs.test/api/faqcategories/getall",
                {withCredentials: true}
            ).then(_success, _error);
        }

        function _getfaq() {
            return $http.get(
                "http://rockstarlabs.test/api/faq/getall",
                {withCredentials: true}
            ).then(_success, _error);
        }

        function _deleteQuestion(id){
            return $http.delete(
                "http://rockstarlabs.test/api/faq/" + id,
                {withCredentials: true}
            ).then(_success, _error);   
        }

        function _getByIdFaq(id) {
            return $http.get(
                "http://rockstarlabs.test/api/faq/" + id,
                {withCredentials: true}
            ).then(_success, _error);
        }

        function _updateQuestion(id,edit){
            console.log(id,edit);
            return $http.put(
                "http://rockstarlabs.test/api/faq/" + id,
                 edit,
                {withCredentials: true}
            ).then(_success, _error);
        }

        function _deleteCategory(id) {
            return $http.delete(
                "http://rockstarlabs.test/api/faqcategories/" + id,
                {withCredentials: true}
            ).then(_success, _error);
        }

        function _createNewFaq(data) {
            return $http.post(
                "http://rockstarlabs.test/api/faqcategories",
                 data,
                {withCredentials: true}
            ).then(_success, _error);   
        }

        function _createQuestion(newQuestion){
            return $http.post(
                "http://rockstarlabs.test/api/faq",
                newQuestion,
                {withCredentials: true}
            ).then(_success, _error);  
        }
    }
})();
