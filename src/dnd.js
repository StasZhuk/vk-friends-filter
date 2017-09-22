module.exports = () => {
    let dragSrcEl = null;

    function handleDragStart(e) {
        if (e.target.tagName === 'LI') {
            // e.target.style.opacity = '0.4';  // this / e.target is the source node.
            dragSrcEl = e.target;            
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', e.target.outerHTML);
        } else {
            return false;
        }
    }
       
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
      
        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
      
        return false;
    }
      
    // function handleDragEnter(e) {
    //     if (e.target.tagName == 'LI') {
    //         e.target.classList.add('over');
    //     }
    // }
      
    // function handleDragLeave(e) {
    //     if (e.target.tagName == 'LI') {
    //         e.target.classList.remove('over');  // this / e.target is previous target element.
    //     }
    // }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }
      
        // Don't do anything if dropping the same column we're dragging.
        if (dragSrcEl != e.target || e.target != dragSrcEl.parentElement) {
        // Set the source column's HTML to the HTML of the columnwe dropped on.
            if (e.target.tagName == 'UL') {
                dragSrcEl.outerHTML = '';
                e.target.innerHTML += e.dataTransfer.getData('text/html');
            }
            if (e.target.tagName == 'LI') {
                dragSrcEl.outerHTML = '';
                e.target.parentElement.innerHTML += e.dataTransfer.getData('text/html');
            }
        }
      
        return false;
    }

    let lists = document.querySelectorAll('.body__list-friends');

    [].forEach.call(lists, function(item) {
        item.addEventListener('dragstart', handleDragStart, false);
        // item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        // item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
    });

}