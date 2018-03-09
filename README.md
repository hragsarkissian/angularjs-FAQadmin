# angularjs-FAQadmin

<div class="container">
  <div ng-show="$ctrl.faqheader">
    <h2><b>FAQ Admin Page</b></h2>
    <button class="btn btn-success" ng-click="$ctrl.createCategory()">Add New Category</button>
  </div>
  
  <table class="table faqTable" ng-repeat='category in $ctrl.faqCategory' ng-show="$ctrl.isSuccessfull">
    <div>
      <thead>
        <tr>
          <th><h3><b>FAQ Category: {{category.name}}</b></h3></th>
          <th><button class="btn btn-Info" ng-click="$ctrl.openQuestionForm(category.id)">Add Question To {{category.name}}</button</th>
          <th><button class="btn btn-Info" ng-click="$ctrl.deleteCategory(category.id)">Delete {{category.name}} Category</button></th>
        </tr>
      </thead>
        <tr>
          <th colspan="2">Question</th>
          <th colspan="2">Answer</th>         
          <th style="text-align:center">Edit / Delete</th>
        </tr>
      <tbody>
        <tr ng-repeat='faq in $ctrl.faqitem' ng-if='faq.faqCategoryId == category.id'>
          <td colspan="2">{{faq.question}}</td>
          <td colspan="2">{{faq.answer}}</td>
          <td align="center">
            <button class="btn btn-primary" ng-click="$ctrl.editQuestion(faq.id)">Edit</button>        
            <button class="btn btn-danger" ng-click="$ctrl.deleteQuestion(faq.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </div>
  </table>
</div>

<div class="container" ng-show="$ctrl.editfaq">
  <h1>Edit Your FAQ</h1>
  <form name="$ctrl.editFaq" novalidate>
      <label>Question:</label>
        <textarea required
            style="height:100px;font-size:12pt;" 
            name="question" 
            type="textbox" 
            class="form-control" 
            placeholder="Type Your Question" 
            ng-model="$ctrl.edit.question" />
            <p class="error" 
                ng-show="($ctrl.$dirty 
                    || $ctrl.editFaq.question.$touched) 
                    && $ctrl.editFaq.question.$invalid">
                    Question is Required
            </p>
      <label>Answer:</label>
        <textarea required 
            style="height:100px;font-size:12pt;" 
            name="answer" 
            type="textbox" 
            class="form-control" 
            placeholder="Enter Your Answer" 
            ng-model="$ctrl.edit.answer"/>
            <p class="error" 
                ng-show="($ctrl.$dirty 
                || $ctrl.editFaq.answer.$touched) 
                && $ctrl.editFaq.answer.$invalid">Answer is Required
            </p>
        <br>
        <button class="btn btn-primary" ng-click="$ctrl.updateQuestion()">Update</button>
  </form>
</div>

<div class="container" ng-show="$ctrl.addfaqCategory">
  <h1>Add New FAQ Category</h1>
  <form name="$ctrl.createFaqCategory" novalidate>
      <label>Category Title:</label>
          <textarea required
              style="height:100px;font-size:12pt;" 
              name="name" 
              type="textbox" 
              class="form-control" 
              placeholder="Enter FAQ Title" 
              ng-model="$ctrl.newCategory.name"/>
      <p class="error" 
          ng-show="($ctrl.$dirty 
          || $ctrl.createFaqCategory.question.$touched) 
          && $ctrl.createFaqCategory.question.$invalid">
          Category Title is Required
      </p>
      <label>Description:</label>
          <textarea required 
              style="height:100px;font-size:12pt;" 
              name="description" 
              type="textbox" 
              class="form-control" 
              placeholder="Describe FAQ Category" 
              ng-model="$ctrl.newCategory.description"/>
      <p class="error" 
         ng-show="($ctrl.$dirty 
         || $ctrl.createFaqCategory.description.$touched) 
         && $ctrl.createFaqCategory.description.$invalid">Description is Required
      </p>
      <br>
        <button class="btn btn-primary" ng-click="$ctrl.createNewFaq()">Create FAQ</button>
  </form>
</div>

  <div class="modal" aria-hidden="false" style="display: block;" ng-show="$ctrl.dialog">  
    <div class="modal-dialog">    
      <div class="modal-content">   
         <b>You still have questions in this category. Please note that you have to delete all the questions in the category before deleting the entire FAQ category</b>   
          <button type="button" class="btn btn-primary" ng-click="$ctrl.dialog=false">Ok</button>     
      </div>
    </div>
  </div>
  
  <div class="container" ng-show="$ctrl.createFaq">
	<h1>Create New Question</h1>
    <form name="$ctrl.createfaq" novalidate>
        <label>Question:</label>
            <textarea required
                style="height:100px;font-size:12pt;" 
                name="question" 
                type="textbox" 
                class="form-control" 
                placeholder="Type Your Question" 
                ng-model="$ctrl.newQuestion.question" />
        <p class="error" 
          ng-show="($ctrl.$dirty 
            || $ctrl.createfaq.question.$touched) 
            && $ctrl.createfaq.question.$invalid">
            Question is Required
        </p>
        <label>Answer:</label>
            <textarea required 
                style="height:100px;font-size:12pt;" 
                name="answer" 
                type="textbox" 
                class="form-control" 
                placeholder="Enter Your Answer" 
                ng-model="$ctrl.newQuestion.answer"/>
                <p class="error" ng-show="($ctrl.$dirty 
                        || $ctrl.createfaq.answer.$touched) 
                        && $ctrl.createfaq.answer.$invalid">Answer is Required
                </p>
            <br>
        <label>Display Order:</label>
        <select ng-model='$ctrl.newQuestion.displayorder'>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br>
        <br>
        <button class="btn btn-primary" ng-click="$ctrl.createQuestion()">Create Question</button>
    </form>
  </div>
