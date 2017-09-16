/*
|--------------------------------------------------------------------------
| Directive For Multiple Files Upload
|--------------------------------------------------------------------------
|
| This directive parses/apply the input files selected
| to the parent scope model.
|
*/

filesModule.directive('filesInput', [
    '$parse',
    function ($parse)
    {
        var self = this;

        self.restrict = 'A';

        self.link = function (scope, element, attributes, controller)
        {
            var model = $parse(attributes.filesInput);
            var assign = model.assign;

            // Binds the event listener
            element.bind('change', function () {
                var files = [];
                var elementFiles = element[0].files;

                angular.forEach(elementFiles, function (file, key) {
                    files.push(file);
                });

                // Apply the files to the scope
                scope.$apply(function () {
                    assign(scope, files);
                });
            });
        }

        return self;
    }
]);
