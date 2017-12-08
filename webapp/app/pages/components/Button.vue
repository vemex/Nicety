<template>
  <div>
    <div>
      <button type="button" class="btn btn-primary">Primary</button>
      <button type="button" class="btn btn-secondary">Secondary</button>
      <button type="button" class="btn btn-success">Success</button>
      <button type="button" class="btn btn-danger">Danger</button>
      <button type="button" class="btn btn-warning">Warning</button>
      <button type="button" class="btn btn-info">Info</button>
      <button type="button" class="btn btn-light">Light</button>
      <button type="button" class="btn btn-dark">Dark</button>
      <button type="button" class="btn btn-link">Link</button>
    </div>
    <br/>
    <div>
      <a class="btn btn-primary" href="#" role="button">Link</a>
      <button class="btn btn-primary" type="submit">Button</button>
      <input class="btn btn-primary" type="button" value="Input" />
      <input class="btn btn-primary" type="submit" value="Submit" />
      <input class="btn btn-primary" type="reset" value="Reset" />
    </div>
    <br/>
    <div>
      <button type="button" class="btn btn-outline-primary">Primary</button>
      <button type="button" class="btn btn-outline-secondary">Secondary</button>
      <button type="button" class="btn btn-outline-success">Success</button>
      <button type="button" class="btn btn-outline-danger">Danger</button>
      <button type="button" class="btn btn-outline-warning">Warning</button>
      <button type="button" class="btn btn-outline-info">Info</button>
      <button type="button" class="btn btn-outline-light">Light</button>
      <button type="button" class="btn btn-outline-dark">Dark</button>
    </div>
    <br/>
    <div>
      <button type="button" class="btn btn-primary btn-lg">Large button</button>
      <button type="button" class="btn btn-secondary btn-lg">Large button</button>
    </div>
    <br/>
    <div>
      <button type="button" class="btn btn-primary btn-sm">Small button</button>
      <button type="button" class="btn btn-secondary btn-sm">Small button</button>
    </div>
    <br/>
    <div>
      <button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>
      <button type="button" class="btn btn-secondary btn-lg btn-block">Block level button</button>
    </div>
    <br/>
    <div>
      <button type="button" class="btn btn-lg btn-primary" disabled>Primary button</button>
      <button type="button" class="btn btn-secondary btn-lg" disabled>Button</button>
    </div>
    <br/>
    <div><a href="#" class="btn btn-primary btn-lg disabled" role="button" aria-disabled="true">Primary link</a>
      <a href="#" class="btn btn-secondary btn-lg disabled" role="button" aria-disabled="true">Link</a>
    </div>
    <br/>
    <div><button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
              Single toggle
            </button>
    </div>
    <br/>
    <div>
      <div class="btn-group" data-toggle="buttons">
        <label class="btn btn-secondary active">
                <input type="checkbox" checked autocomplete="off"> Checkbox 1 (pre-checked)
              </label>
        <label class="btn btn-secondary">
                <input type="checkbox" autocomplete="off"> Checkbox 2
              </label>
        <label class="btn btn-secondary">
                <input type="checkbox" autocomplete="off"> Checkbox 3
              </label>
      </div>
    </div>
    <br/>
    <div>
      <div class="btn-group" data-toggle="buttons">
        <label class="btn btn-secondary active">
        <input type="radio" name="options" id="option1" autocomplete="off" checked> Radio 1 (preselected)
      </label>
        <label class="btn btn-secondary">
        <input type="radio" name="options" id="option2" autocomplete="off"> Radio 2
      </label>
        <label class="btn btn-secondary">
        <input type="radio" name="options" id="option3" autocomplete="off"> Radio 3
      </label>
      </div>
    </div>
  </div>
</template>