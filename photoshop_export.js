// JavaScript source code


#target photoshop


// Getting Document
doc = app.activeDocument


//Getting Preferences

settings_file = File(Folder.userData + "/photoshop_export_tool_settings.txt");

const default_prefs = ["false","","true","","0","","","0","100%"]

function load_prefs() {
    var fileContents = "";

    if (settings_file.exists) {
        settings_file.open('r');
        file_contents = settings_file.read()
        settings_file.close()
    } else {

        return default_prefs
    }

    pref = file_contents.split(":")
    if (pref.length != 9) { return default_prefs }
    return pref
    
}

prefs = load_prefs()


// Saving Preferences

function save_prefs() {

    prefs_string = ""

    // Unity Selected
    prefs_string = prefs_string + unity_checkbox.value.toString() + ":"

    // Unity Path
    prefs_string = prefs_string + unity_file_path_edittext.text + ":"

    // Project Asset Selected
    prefs_string = prefs_string + proj_asset_checkbox.value.toString() + ":"

    // Project Asset Path
    prefs_string = prefs_string + proj_asset_path_edittext.text + ":"

    // Asset Folder
    prefs_string = prefs_string + asset_folder_dropdownlist.selection.index + ":"

    // File Prefix
    prefs_string = prefs_string + prefix_edittext.text + ":"

    // File Suffix
    prefs_string = prefs_string + suffix_edittext.text + ":"

    // File Type
    prefs_string = prefs_string + file_type_dropdown.selection.index + ":"

    // Image Scale
    prefs_string = prefs_string + scale_edittext.text

    if (!settings_file.exists) { 
        try {

            settings_file.create() 
    
        } catch (err) {
            settings_file.write(prefs_string)
        }
    }

    settings_file.open('w')
    settings_file.write(prefs_string)
    settings_file.close()
}



// Defining Elements of UI Window


//Window
var win = new Window("dialog", "Unity Export Tool", undefined, { closeButton: true }, {resizeable: true});
win.alignChildren = ['fill', 'fill']
win.minimumSize = [300, 400]


//Panels


// Asset Destination Section
asset_destination_panel = win.add("panel", undefined, "Asset Destination")
asset_destination_panel.alignChildren = ['fill', 'fill']
asset_destination_panel.preferredSize = [450, 200]
asset_destination_panel.orientation = 'column'
unity_checkbox = asset_destination_panel.add("checkbox", undefined, "Unity")
unity_browse_panel = asset_destination_panel.add("panel", undefined, '', { borderStyle: 'none' })
unity_browse_panel.alignChildren = ['fill', 'fill']
unity_browse_panel.orientation = 'row'
unity_browse_button = unity_browse_panel.add("button", undefined, "Browse")
unity_browse_button.alignment = 'left'
unity_file_path_edittext = unity_browse_panel.add("edittext")
    unity_file_path_edittext.text = prefs[1]
unity_file_path_edittext.alignment = ['fill', 'fill']
proj_asset_checkbox = asset_destination_panel.add('checkbox', undefined, "Project Asset Folder Structure")
proj_asset_panel = asset_destination_panel.add("panel", undefined, '', { borderStyle: 'none' })
proj_asset_panel.alignChildren = ['fill', 'fill']
proj_asset_panel.orientation = 'column'
proj_asset_browse_panel = proj_asset_panel.add("panel", undefined, '', { borderStyle: 'none' })
proj_asset_browse_panel.orientation = 'row'
proj_asset_browse_button = proj_asset_browse_panel.add("button", undefined, "Browse")
proj_asset_browse_button.alignment = 'left'
proj_asset_path_edittext = proj_asset_browse_panel.add("edittext")
    proj_asset_path_edittext.text = prefs[3]
proj_asset_path_edittext.alignment = ['fill', 'fill']
proj_asset_folder_panel = proj_asset_panel.add("panel", undefined, '', { borderStyle: 'none' })
proj_asset_folder_panel.orientation = 'row'
proj_asset_folder_panel.add("statictext", undefined, 'Asset Folder')
asset_folder_dropdownlist = proj_asset_folder_panel.add("dropdownlist", undefined, ['Backgrounds', 'Icons', 'UIElements'])
    asset_folder_dropdownlist.selection = Number(prefs[4])
asset_folder_dropdownlist.alignment = ['left', 'fill']


// File Name Section
file_name_panel = win.add("panel", undefined, "File Name")
file_name_panel.orientation = 'column'
file_name_panel.preferredSize = [450, 200]
file_name_panel.alignChildren = ['fill', 'fill']
name_parts_panel = file_name_panel.add("panel", undefined, '', { borderStyle: 'none' })
name_parts_panel.alignChildren = ['fill', 'fill']
name_parts_panel.orientation = "row"
prefix_panel = name_parts_panel.add("panel", undefined, '', { borderStyle: 'none' })
prefix_panel.alignChildren = ['fill', 'center']
prefix_panel.orientation = 'column'
prefix_statictext = prefix_panel.add("statictext", undefined, "Prefix")
prefix_edittext = prefix_panel.add("edittext", undefined)
    prefix_edittext.text = prefs[5] 
file_name_panel_inner = name_parts_panel.add("panel", undefined, '', { borderStyle: 'none' })
file_name_panel_inner.orientation = 'column'
file_name_panel_inner.alignChildren = ['fill', 'center']
file_name_statictext = file_name_panel_inner.add("statictext", undefined, "File Name")
file_name_edittext = file_name_panel_inner.add("edittext", undefined)
suffix_panel = name_parts_panel.add("panel", undefined, '', { borderStyle: 'none' })
suffix_panel.alignChildren = ['fill', 'center']
suffix_panel.orientation = 'column'
suffix_statictext = suffix_panel.add("statictext", undefined, "Suffix")
suffix_edittext = suffix_panel.add("edittext", undefined)
    suffix_edittext.text = prefs[6]
exported_asset_panel = file_name_panel.add("panel", undefined, '', { borderStyle: 'none' })
exported_asset_panel.orientation = 'row'
exported_asset_panel.alignment = ['center', 'center']
exp_asset_statictext = exported_asset_panel.add("statictext", undefined, "Exported Asset")
full_name_edittext = exported_asset_panel.add("edittext", undefined)
full_name_edittext.alignment = ["fill", "center"]
full_name_edittext.preferredSize = [150, 15]


// File Format Section
file_format_panel = win.add("panel", undefined, '', { borderStyle: 'none' })
file_format_panel.orientation = 'row'
asset_destination_panel.preferredSize = [450, 200]
file_format_panel.alignChildren = ['fill', 'fill']
file_type_panel = file_format_panel.add('panel', undefined, 'File Type', { borderStyle: 'none' })
file_type_panel.orientation = 'column'
file_type_dropdown = file_type_panel.add("dropdownlist", undefined, ["PNG", "JPG", "PSD", "PSB"])
    file_type_dropdown.selection = Number(prefs[7])
image_length_panel = file_format_panel.add('panel', undefined, 'Image Dimensions', { borderStyle: 'none' })
width_panel = image_length_panel.add('panel', undefined, '', { borderStyle: 'none' })
width_panel.orientation = 'row'
width_statictext = width_panel.add('statictext', undefined, 'Width')
width_edittext = width_panel.add('edittext')
width_px_statictext = width_panel.add('statictext', undefined, "px")
height_panel = image_length_panel.add('panel', undefined, '', { borderStyle: 'none' })
height_panel.orientation = 'row'
height_statictext = height_panel.add('statictext', undefined, 'Height')
height_edittext = height_panel.add('edittext')
height_px_statictext = height_panel.add('statictext', undefined, "px")
scale_panel = image_length_panel.add('panel', undefined, '', { borderStyle: 'none' })
scale_panel.orientation = 'row'
scale_statictext = scale_panel.add('statictext', undefined, 'Scale')
scale_edittext = scale_panel.add('edittext')
    scale_edittext.text = prefs[8]

export_button = win.add("button", undefined, "Export")
export_button.alignment = ['center', 'center']  


// Defining Behavior of File Name Section (+ updating file name when file type is changed)


// update_exp_asset_edittext() - Updates the contents of 'exported asset' based on ui Elements
function update_exp_asset_edittext() {


    file_name = ''


    if (prefix_edittext.text.length >= 1) { file_name = file_name + prefix_edittext.text + "_" }
    file_name = file_name + file_name_edittext.text
    if (suffix_edittext.text.length >= 1) { file_name = file_name + "_" + suffix_edittext.text }


    full_name_edittext.text = file_name + "." + file_type_dropdown.selection.toString().toLowerCase()

    win.update()


}


// Calling update_exp_asset_edittext() when change in prefix, file name, and suffix edittexts
prefix_edittext.onChange = function () { update_exp_asset_edittext() }
suffix_edittext.onChange = function () { update_exp_asset_edittext() }
file_name_edittext.onChange = function () { update_exp_asset_edittext() }

// Populate File Name


file_name_edittext.text = doc.name
// Removing Underscores If Present
reg = /_(.*?)_/g;
if (doc.name.search(reg) != -1) {
    file_name_edittext.text = reg.exec(doc.name)[1]
}


update_exp_asset_edittext()

// Defining Behavior of Asset Destination Section

// Browse Buttons
// update_location(unity) Function, gets and updates export location
function update_location(unity) {


    folder = Folder.selectDialog()


    if (unity) {
        unity_file_path_edittext.text = folder.absoluteURI
    } else {
        proj_asset_path_edittext.text = folder.absoluteURI
    }


    win.update()


}


unity_browse_button.onClick = function () { update_location(true) }
proj_asset_browse_button.onClick = function () { update_location(false) }


// Checkboxes
//toggle_locations(unity) Function - Disable Browse Area if Checkbox is Unchecked
function toggle_locations(unity) {


    if (unity) {


        if (unity_checkbox.value) { unity_browse_panel.enabled = true }
        else { unity_browse_panel.enabled = false }


    } else {


        if (proj_asset_checkbox.value) { proj_asset_panel.enabled = true }
        else { proj_asset_panel.enabled = false }


    }


    win.update()


}


unity_checkbox.onClick = function () { toggle_locations(true) }
proj_asset_checkbox.onClick = function () { toggle_locations(false) }

// Clicking Unity and Project Asset Checkboxes Depending on Preferences
    if (prefs[0] === 'true') { unity_checkbox.notify(); } else { unity_checkbox.notify(); unity_checkbox.notify(); }
  
    if (prefs[2] === 'true') { proj_asset_checkbox.notify(); } else { proj_asset_checkbox.notify(); proj_asset_checkbox.notify() }


// Defining Behavior of File Format Section

// Populating length and Scale Windows
height_edittext.text = doc.height.value
width_edittext.text = doc.width.value
update_height_width()


// Updating Height and Width Based on Scale
function update_scale(change) {
    if (change == 0) {
        factor = Number(height_edittext.text) / Number(doc.height.value)
    } else if (change == 1) { factor = Number(width_edittext.text) / Number(doc.width.value) }
    else {
        if (scale_edittext.text.search("%") == -1) { scale_edittext.text = scale_edittext.text + "%" }
        return
    }
    scale_edittext.text = Math.round(factor * 100 * 100) / 100 + "%"
    win.update()


}


function update_height_width() {
    factor = scale_edittext.text


    if (factor.indexOf("%") != -1) {
        factor = factor.substring(0, factor.indexOf("%"))
    }


    try {


        factor = Number(factor)


    } catch (e) {
        factor = "100"
        scale_edittext.text = "100%"
    }


    height_edittext.text = Math.round(doc.height.value * factor) / 100.0
    width_edittext.text = Math.round(doc.width.value * factor) / 100.0


    win.update()


}


scale_edittext.onChange = function () { update_height_width(); update_scale(2) }
height_edittext.onChange = function () { update_scale(0); update_height_width() }
width_edittext.onChange = function () { update_scale(1); update_height_width() }


// Toggling Image length Panel Based on file type
file_type_dropdown.onChange = function () { toggle_image_length_panel(); update_exp_asset_edittext() }


function toggle_image_length_panel() {


    f_type = file_type_dropdown.selection.text


    if (f_type == "PNG" || f_type == "JPG") { image_length_panel.enabled = true }
    else { image_length_panel.enabled = false }


    win.update()


}








// Creating File Paths


// File Path Variables
file_path_list = []


// Creating Paths function
function create_paths() {


    success = false


    // Setting working directory
    $.fileName = Folder("C:/").fsName

    if (!unity_checkbox.value && !proj_asset_checkbox.value) {
        alert("Please select at least one export location")
        return success
    }


    // Removing Whitespace in Names
    filename = file_name_edittext.text.replace(/\s/g, "")

    // Define Asset Folder
    asset_folder = asset_folder_dropdownlist.selection.text


    if (unity_checkbox.value) {

        //Double-Check That The Export Location is Defined
        if (unity_file_path_edittext.text.toString().search("^~\/") == -1) { alert("Please select a valid unity project folder"); return success }

        // Create Folders if Necessary
        folders_list = []

        folders_list.push(Folder(unity_file_path_edittext.text + "/Assets/UIUX/Sprites/" + filename))
        folders_list.push(Folder(unity_file_path_edittext.text + "/Assets/UIUX/Textures/" + filename))
        folders_list.push(Folder(unity_file_path_edittext.text + "/Assets/UIUX/CommonAssets/Sprites/" + filename))
        folders_list.push(Folder(unity_file_path_edittext.text + "/Assets/UIUX/CommonAssets/Textures/" + filename))


        for (i = 0; i < folders_list.length; i++) {

            try {
                if (!folders_list[i].exists) {
                    folders_list[i].create()
                }
            } catch (err) {
                alert("Please select a valid unity project folder")
            }


            file_path_list.push(folders_list[i] + "/" + "T_UI_" + full_name_edittext.text)




        }




    }




    if (proj_asset_checkbox.value) {


        // Checking That Subfolder Has Been Selected
        if (asset_folder_dropdownlist.selection == null) {
            alert("Please select an asset folder (e.g. Backgrounds, Sprites, etc.)")
            return success
        }


        //Double-Check That The Export Location is Defined
        if (proj_asset_path_edittext.text.toString().search("^~\/") == -1) {
            alert("Please select a valid project asset folder")
            return success
        }


        if (file_type_dropdown.selection == "PSB" || file_type_dropdown.selection == "PSD") {








            folders_list = []
            folders_list.push(Folder(proj_asset_path_edittext.text + "/UIUX/Work/" + filename + "/Working"))
            folders_list.push(Folder(proj_asset_path_edittext.text + "/UIUX/Work/CommonAssets/" + asset_folder + "/Working"))




            for (i = 0; i < folders_list.length; i++) {



                try {
                    if (!folders_list[i].exists) {
                        folders_list[i].create()
                    }
                } catch (err) {
                    alert("Please select a valid project asset folder")
                    return success

                }

                // Format as Working File
                file_path_list.push(folders_list[i] + "/" + full_name_edittext.text)
                file_path_list.push(folders_list[i] + "/" + full_name_edittext.text)


            }








         








        } else {





            folders_list = []
            folders_list.push(Folder(proj_asset_path_edittext.text + "/UIUX/Work/" + filename + "/Exported"))
            folders_list.push(Folder(proj_asset_path_edittext.text + "/UIUX/Work/CommonAssets/" + asset_folder + "/Exported"))




            for (i = 0; i < folders_list.length; i++) {



                try {
                    if (!folders_list[i].exists) {
                        folders_list[i].create()
                    }
                } catch (err) {
                    alert("Please select a valid project asset folder")
                    return success

                }

                // Export as Exported File
                file_path_list.push(folders_list[i] + "/" + full_name_edittext.text)
                file_path_list.push(folders_list[i] + "/" + full_name_edittext.text)


            }








        }




    }

    success = true
    return success

}


// Exporting
export_button.onClick = function () {
    try {
        export_button.text = "Exporting...";
        win.update();
        export_file();
    } catch (err) {
        alert(err)
        export_button.text = 'Export';
        win.update();
    }
}

function export_file() {

   if (!create_paths()) { export_button.text = "Export";  return; }


    // Creating Save Options


    save_options = new PhotoshopSaveOptions()


    if (file_type_dropdown.selection.toString() == 'PNG') {
        save_options = new PNGSaveOptions()
    } else if (file_type_dropdown.selection.toString() == 'JPG') {
        save_options = new JPEGSaveOptions()
    }


    // Resizing Image


    doc_copy = doc.duplicate()


    // Getting Width and Height
    wi = Number(width_edittext.text)
    hi = Number(height_edittext.text)
    if (wi != doc.width.value || hi != doc.height.value) { doc_copy.resizeImage(wi, hi) }

    if (file_type_dropdown.selection.toString() == 'PSB') {

        for (i = 0; i < file_path_list.length; i++) { 
            try {
                exp_file = File(file_path_list[i])


                var desc1 = new ActionDescriptor();
                var desc2 = new ActionDescriptor();
                desc2.putBoolean(stringIDToTypeID('maximizeCompatibility'), true);
                desc1.putObject(charIDToTypeID('As  '), charIDToTypeID('Pht8'), desc2);
                desc1.putPath(charIDToTypeID('In  '), new File(exp_file));
                desc1.putBoolean(charIDToTypeID('LwCs'), true);
                executeAction(charIDToTypeID('save'), desc1, DialogModes.NO);

            } catch (err) { 

                alert(err)
            }
        }   
    } else {

        for (i = 0; i < file_path_list.length; i++) {

            try {
                exp_file = File(file_path_list[i])
                doc_copy.saveAs(exp_file, save_options, true)
            } catch (err) {

                alert(err)

            }

        }

    }

    doc_copy.close(SaveOptions.DONOTSAVECHANGES)
    save_prefs()

    win.close()


}






// Showing the Window
win.show()
