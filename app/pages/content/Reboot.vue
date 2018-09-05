<template>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">标题</h4>
            <div>
                <table class="table">
                    <thead>
                    <tr>
                        <th>Heading</th>
                        <th>Example</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <p><code class="highlighter-rouge">&lt;h1&gt;&lt;/h1&gt;</code></p>

                        </td>
                        <td><span class="h1">h1. Bootstrap heading</span></td>
                    </tr>
                    <tr>
                        <td>
                            <p><code class="highlighter-rouge">&lt;h2&gt;&lt;/h2&gt;</code></p>

                        </td>
                        <td><span class="h2">h2. Bootstrap heading</span></td>
                    </tr>
                    <tr>
                        <td>
                            <p><code class="highlighter-rouge">&lt;h3&gt;&lt;/h3&gt;</code></p>

                        </td>
                        <td><span class="h3">h3. Bootstrap heading</span></td>
                    </tr>
                    <tr>
                        <td>
                            <p><code class="highlighter-rouge">&lt;h4&gt;&lt;/h4&gt;</code></p>

                        </td>
                        <td><span class="h4">h4. Bootstrap heading</span></td>
                    </tr>
                    <tr>
                        <td>
                            <p><code class="highlighter-rouge">&lt;h5&gt;&lt;/h5&gt;</code></p>

                        </td>
                        <td><span class="h5">h5. Bootstrap heading</span></td>
                    </tr>
                    <tr>
                        <td>
                            <p><code class="highlighter-rouge">&lt;h6&gt;&lt;/h6&gt;</code></p>

                        </td>
                        <td><span class="h6">h6. Bootstrap heading</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <h4>列表</h4>
            <hr>
            <div class="border p-4 mb-4">
                <ul>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Integer molestie lorem at massa</li>
                    <li>Facilisis in pretium nisl aliquet</li>
                    <li>Nulla volutpat aliquam velit
                        <ul>
                            <li>Phasellus iaculis neque</li>
                            <li>Purus sodales ultricies</li>
                            <li>Vestibulum laoreet porttitor sem</li>
                            <li>Ac tristique libero volutpat at</li>
                        </ul>
                    </li>
                    <li>Faucibus porta lacus fringilla vel</li>
                    <li>Aenean sit amet erat nunc</li>
                    <li>Eget porttitor lorem</li>
                </ul>

                <ol>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Integer molestie lorem at massa</li>
                    <li>Facilisis in pretium nisl aliquet</li>
                    <li>Nulla volutpat aliquam velit</li>
                    <li>Faucibus porta lacus fringilla vel</li>
                    <li>Aenean sit amet erat nunc</li>
                    <li>Eget porttitor lorem</li>
                </ol>

            </div>

            <h4>DL DT DD </h4>
            <hr>
            <div class="border p-4  mb-4">
                <dl>
                    <dt>计算机</dt>
                    <dd>用来计算的仪器 ... ...</dd>
                    <dt>显示器</dt>
                    <dd>以视觉方式显示信息的装置 ... ...</dd>
                </dl>
            </div>


            <h4>表格 </h4>
            <hr>
            <div class="border p-4  mb-4">
                <table>
                    <caption>
                        This is an example table, and this is its caption to describe the contents.
                    </caption>
                    <thead>
                    <tr>
                        <th>Table heading</th>
                        <th>Table heading</th>
                        <th>Table heading</th>
                        <th>Table heading</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                    </tr>
                    <tr>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                    </tr>
                    <tr>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <h4>表单 </h4>
            <hr>
            <div class="border p-4  mb-4">

                <form class="bd-example">
                    <fieldset>
                        <legend>Example legend</legend>

                        <p>
                            <label for="input">Example input</label>
                            <input type="text" id="input" placeholder="Example input">
                        </p>

                        <p>
                            <label for="select">Example select</label>
                            <select id="select">
                                <option value="">Choose...</option>
                                <optgroup label="Option group 1">
                                    <option value="">Option 1</option>
                                    <option value="">Option 2</option>
                                    <option value="">Option 3</option>
                                </optgroup>
                                <optgroup label="Option group 2">
                                    <option value="">Option 4</option>
                                    <option value="">Option 5</option>
                                    <option value="">Option 6</option>
                                </optgroup>
                            </select>
                        </p>

                        <p>
                            <label>
                                <input type="checkbox" value="">
                                Check this checkbox
                            </label>
                        </p>

                        <p>
                            <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked="">
                                Option one is this and that
                            </label>
                            <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                                Option two is something else that's also super long to demonstrate the wrapping of these fancy form controls.
                            </label>
                            <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3"
                                       disabled="">
                                Option three is disabled
                            </label>
                        </p>

                        <p>
                            <label for="textarea">Example textarea</label>
                            <textarea id="textarea" rows="3"></textarea>
                        </p>

                        <p>
                            <label for="date">Example date</label>
                            <input type="date" id="date">
                        </p>

                        <p>
                            <label for="time">Example time</label>
                            <input type="time" id="time">
                        </p>

                        <p>
                            <label for="output">Example output</label>
                            <output name="result" id="output">100</output>
                        </p>

                        <p>
                            <button type="submit">Button submit</button>
                            <input type="submit" value="Input submit button">
                            <input type="button" value="Input button">
                        </p>

                        <p>
                            <button type="submit" disabled="">Button submit</button>
                            <input type="submit" value="Input submit button" disabled="">
                            <input type="button" value="Input button" disabled="">
                        </p>
                    </fieldset>
                </form>
            </div>

            <h4>地址 </h4>
            <hr>
            <div class="border p-4  mb-4">
                <div class="bd-example">
                    <address>
                        <strong>Twitter, Inc.</strong><br>
                        1355 Market St, Suite 900<br>
                        San Francisco, CA 94103<br>
                        <abbr title="Phone">P:</abbr> (123) 456-7890
                    </address>

                    <address>
                        <strong>Full Name</strong><br>
                        <a href="mailto:#">first.last@example.com</a>
                    </address>
                </div>
            </div>

            <h4>块引用 </h4>
            <hr>
            <div class="border p-4  mb-4">
                <blockquote class="blockquote">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                    <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
                </blockquote>
            </div>

            <h4>abbr标记 </h4>
            <hr>
            <div class="border p-4  mb-4">
                <div class="bd-example">
                    Nulla <abbr title="attribute">attr</abbr> vitae elit libero, a pharetra augue.
                </div>
            </div>
        </div>
    </div>
</template>
