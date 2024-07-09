document.addEventListener('DOMContentLoaded', function() {
    const modeSwitch = document.getElementById('modeSwitch');
    const newImplView = document.getElementById('newImplView');
    const testURLTech = document.getElementById('testURLTech');
    const clipboardView = document.getElementById('clipboard');
    const compatibleView = document.getElementById('compatibleBox');

    // Function to update the visibilty of page elements.
    function updateButtonVisibility() {
        if (modeSwitch.checked) {
            // If tech mode enabled, display (block) or hide (none) these elements.
            newImplView.style.display = 'block';
            testURLTech.style.display = 'block';
            clipboardView.style.display = 'block';
            compatibleView.style.display = 'none';
        } else {
            newImplView.style.display = 'none';
            testURLTech.style.display = 'none';
            clipboardView.style.display = 'none';
            compatibleView.style.display = 'block';
        }
    }

    // Restore the state of the checkbox and update element visibility
    chrome.storage.local.get(['modeSwitch'], function(result) {
        if (result.modeSwitch !== undefined) {
            modeSwitch.checked = result.modeSwitch;
            updateButtonVisibility();
        }
    });

    // Save the state of the checkbox and update element visibility when it is changed
    modeSwitch.addEventListener('change', function() {
        chrome.storage.local.set({modeSwitch: modeSwitch.checked}, function() {
            updateButtonVisibility();
        });
    });
});
