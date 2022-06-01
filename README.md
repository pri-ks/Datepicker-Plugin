# Datepicker-plugin
A simplified Datepicker plugin based on vanilla JS that works up to IE8. Can be appended to any number of input boxes.
Does not require any external library or script to run. Light-weight and useful for user who only need a datepicker in their website.

###### Features:

1) Based on Vanilla JS.

2) Compatible upto IE8.

3) Date can be selected by click as well as using up, down, left and right arrow keys as well.

4) Traversal arrows provided for months as well as years.

###### Quick Start:

1) Download "main.js" file.

2) Include the "main.js" script in the <head> tag of the HTML page where the Datepicker is to be called.
  
   ```html
    <head>
    .
    .
       <script src="main.js"></script>
    .
    .
    </head>
   ```
   
3) Add class "displayDate" to the input element to which datepicker is to be appended also attach "DatePicker()" method on click of the input.
   
   ```html
      <input type="text" class="displayDate" onclick="DatePicker()" />"
   ``` 
   
4) Wrap the input element with a "div" tag and add class "displayDateWrap" to it.

   ```html
   <div class="displayDateWrap">
      <label>Pick date:</label><input type="text" class="displayDate" onclick="DatePicker()" />
   </div>
   ```
   
5) Open the HTML file in the browser, and click on the desired input button, the datepicker shall appear.
  
###### Screenshot of the Datepicker in action:

![image](https://user-images.githubusercontent.com/25787388/171512158-c875e1bd-1f8a-4eb3-b01a-98177eca4681.png)
  
###### LICENSE NOTES:
  The Datepicker plugin is an open source of code and is intended to be easily reused by any average user hence the MIT license was chosen. Since the license gives the user right to use, replicate, edit, distribute the code as long as the copyright is included everywhere, it was an apt choice in order to ensure that all its users have the flexibility to use and integrate the plugin as per their own project needs.
