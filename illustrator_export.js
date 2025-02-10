// JavaScript source code, Version 1.0




#target illustrator;




// Getting Document
doc = app.activeDocument





//Loading Saved Preferences

//Getting Preferences

settings_file = File(Folder.userData + "/illustrator_export_tool_settings.txt");

// Default Preferences - 0:Unity, 1:Unity Path, 2:Project Asset, 3:Proj Asset Path, 4:Asset Folder, 5:Prefix, 6:Suffix, 7:Filetype, 8:Artboards, 9:All/Range, 10:Range, 11:Resolution 
const default_prefs = ["false", "", "true", "", "0", "", "", "0", "false","","0"]

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
    if (pref.length != 12) { return default_prefs }
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

    // Artboards
    prefs_string = prefs_string + artboard_checkbox.value.toString() + ":"

    // All or Range
    prefs_string = prefs_string + artboard_radio_all.value.toString() + ":"

    // Range
    prefs_string = prefs_string + artboard_radio_range_edittext.text + ":"

    // Resolution
    prefs_string = prefs_string + resolution_dropdownlist.selection.index

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
var window = new Window("dialog", "Unity Export Tool", undefined, { closeButton: true, resizable: true});
window.alignChildren = ['fill', 'fill']
window.minimumSize = [300, 400]




//Panels




// Asset Destination Section
    asset_destination_panel = window.add("panel", undefined, "Asset Destination")
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
    unity_file_path_edittext.alignment = ['fill', 'fill']
        unity_file_path_edittext.text = prefs[1]
        unity_checkbox.value = (prefs[0] === 'true')
    proj_asset_checkbox = asset_destination_panel.add('checkbox', undefined, "Project Asset Folder Structure")
    proj_asset_panel = asset_destination_panel.add("panel", undefined, '', { borderStyle: 'none' })
    proj_asset_panel.alignChildren = ['fill', 'fill']
    proj_asset_panel.orientation = 'column'
    proj_asset_browse_panel = proj_asset_panel.add("panel", undefined, '', { borderStyle: 'none' })
    proj_asset_browse_panel.orientation = 'row'
    proj_asset_browse_button = proj_asset_browse_panel.add("button", undefined, "Browse")
    proj_asset_browse_button.alignment = 'left'
    proj_asset_path_edittext = proj_asset_browse_panel.add("edittext")
    proj_asset_path_edittext.alignment = ['fill', 'fill']
        proj_asset_path_edittext.text = prefs[3]
        proj_asset_checkbox.value = (prefs[2] === 'true')
    proj_asset_folder_panel = proj_asset_panel.add("panel", undefined, '', { borderStyle: 'none' })
    proj_asset_folder_panel.orientation = 'row'
    proj_asset_folder_panel.add("statictext", undefined, 'Asset Folder')
    asset_folder_dropdownlist = proj_asset_folder_panel.add("dropdownlist", undefined, ['Backgrounds', 'Icons', 'UIElements'])
    asset_folder_dropdownlist.alignment = ['left', 'fill']
        asset_folder_dropdownlist.selection = Number(prefs[4])



// File Name Section
    file_name_panel = window.add("panel", undefined, "File Name")
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
    full_name_edittext.preferredSize = [150, 20]




// File Format Section
    file_format_panel = window.add("panel", undefined, '', { borderStyle: 'none' })
    file_format_panel.orientation = 'row'
    asset_destination_panel.preferredSize = [450, 200]
    file_format_panel.alignChildren = ['fill', 'fill']
    file_type_panel = file_format_panel.add('panel', undefined, 'File Type', { borderStyle: 'none' })
    file_type_panel.orientation = 'row'
    file_type_dropdown = file_type_panel.add("dropdownlist", undefined, ["PNG", "JPG", "AI", "SVG"])
    file_type_dropdown.selection = Number(prefs[7])
    artboard_panel = file_type_panel.add("panel")
    artboard_panel.orientation = 'column'
    artboard_checkbox = artboard_panel.add('checkbox', undefined, 'Use Artboards')
    artboard_radio_all = artboard_panel.add('radiobutton', undefined, 'All')
    artboard_radio_range = artboard_panel.add('radiobutton', undefined, 'Range')
    artboard_radio_range_edittext = artboard_panel.add("edittext")
    artboard_radio_range_edittext.alignment = ['fill', 'center']
        artboard_radio_range_edittext.text = prefs[10]
    resolution_panel = file_format_panel.add('panel', undefined, 'Resolution', { borderStyle: 'none' })
    resolution_dropdownlist = resolution_panel.add('dropdownlist', undefined, ['Screen (72 ppi)', 'Medium (150 ppi)', 'High (300 ppi)'])
        resolution_dropdownlist.selection = Number(prefs[11])





    export_button = window.add("button", undefined, "Export")
    export_button.alignment = ['center', 'center']











// Defining Behavior of File Name Section (+ updating file name when file type is changed)




// update_exp_asset_edittext() - Updates the contents of 'exported asset' based on ui Elements
function update_exp_asset_edittext() {




    file_name = ''




    if (prefix_edittext.text.length >= 1) { file_name = file_name + prefix_edittext.text + "_" }
    file_name = file_name + file_name_edittext.text
    if (suffix_edittext.text.length >= 1) { file_name = file_name + "_" + suffix_edittext.text }




    full_name_edittext.text = file_name + "." + file_type_dropdown.selection.toString().toLowerCase()
    full_name_edittext.text = full_name_edittext.text.replace(/\s/g, "")

    window.update()




}




// Calling update_exp_asset_edittext() when change in prefix, file name, and suffix edittexts
prefix_edittext.onChange = function () { update_exp_asset_edittext() }
suffix_edittext.onChange = function () { update_exp_asset_edittext() }
file_name_edittext.onChange = function () { update_exp_asset_edittext() }
file_type_dropdown.onDeactivate = function () { update_exp_asset_edittext() }




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




    window.update()




}




unity_browse_button.onClick = function () { update_location(true) }
proj_asset_browse_button.onClick = function () { update_location(false) }

toggle_locations(true)
toggle_locations(false)

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




    window.update()




}




unity_checkbox.onClick = function () { toggle_locations(true); guess_file_type() }
proj_asset_checkbox.onClick = function () { toggle_locations(false); guess_file_type }




// Defining Behavior of File Format Section




// Toggling Resolution Panel Based on file type
file_type_dropdown.onChange = function () { toggle_image_length_panel() }




function toggle_image_length_panel() {




    f_type = file_type_dropdown.selection.toString()




    if (f_type == "PNG" || f_type == "JPG") { resolution_panel.enabled = true }
    else { resolution_panel.enabled = false }




    window.update()




}




// Toggling Range Dialog Depending on Range Radidobuttions
artboard_radio_all.onClick = function () {
    if (artboard_radio_all.value) {
        artboard_radio_range_edittext.enabled = false
    } else {
        artboard_radio_range_edittext.enabled = true
    }
}




artboard_radio_range.onClick = function () {
    if (artboard_radio_all.value) {
        artboard_radio_range_edittext.enabled = false
    } else {
        artboard_radio_range_edittext.enabled = true
    }
}




// Toggling Range Panel Depending on Artboard checkbox
artboard_checkbox.onClick = function () {
    if (artboard_checkbox.value) {
        artboard_radio_all.enabled = true
        artboard_radio_range.enabled = true
        if (artboard_radio_all.value) {
            artboard_radio_range_edittext.enabled = false
        } else {
            artboard_radio_range_edittext.enabled = true
        }
    } else {








        artboard_radio_all.enabled = false
        artboard_radio_range.enabled = false
        artboard_radio_range_edittext.enabled = false




    }
}

// Clicking Artboard Checkbox and All/Range Radiobuttons Depending on Preferences
    if(prefs[9] === 'true') {artboard_radio_all.notify()} else { artboard_radio_range.notify()}   
    if (prefs[8] === 'true') { artboard_checkbox.notify() } else { artboard_checkbox.notify(); artboard_checkbox.notify() }












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
                if (folders_list[i].created == null) {
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




        if (file_type_dropdown.selection.text.toString() == "AI" || file_type_dropdown.selection.text.toString() == "SVG") {




            asset_folder = asset_folder_dropdownlist.selection.text




            folders_list = []
            folders_list.push(Folder(proj_asset_path_edittext.text + "/UIUX/Work/" + filename + "/Working"))
            folders_list.push(Folder(proj_asset_path_edittext.text + "/UIUX/Work/CommonAssets/" + asset_folder + "/Working"))




            for (i = 0; i < folders_list.length; i++) {



                try {
                    if (folders_list[i].created == null) {
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




            asset_folder = asset_folder_dropdownlist.selection.text




            folders_list = []
            folders_list.push(Folder(proj_asset_path_edittext.text + "/UIUX/Work/" + filename + "/Exported"))
            folders_list.push(Folder(proj_asset_path_edittext.text + "/UIUX/Work/CommonAssets/" + asset_folder + "/Exported"))




            for (i = 0; i < folders_list.length; i++) {



                try {
                    if (folders_list[i].created == null) {
                        folders_list[i].create()
                    }
                } catch (err) { 
                    alert("Please select a valid project asset folder")
                    return success

                }

                // Format as Exported File
                    file_path_list.push(folders_list[i] + "/" + full_name_edittext.text)
                    file_path_list.push(folders_list[i] + "/" + full_name_edittext.text)


            }









        }




    }

    success = true
    return success

}




// Creating List of Artboards to Be Used in Range
artboard_list = []
function get_artboard_list() {

    success = false

    // Checking if Range or All Artboards
    if (artboard_radio_all.value) {

        for (i = 0; i < doc.artboards.length; i++) { artboard_list.push(i) }

    } else {

        // Removing Whitespace
        tex = artboard_radio_range_edittext.text
        tex = tex.replace(/\s/g,"")

        // Separating Numbers (or Ranges Like 8-15) By Commas
        chunks = []
        while (true) {


            comma_index = tex.indexOf(",")
            if (comma_index == -1) {
                chunks.push(tex)
                break;
            }
            chunks.push(tex.substring(0, comma_index))
            tex = tex.substring(comma_index + 1)

        }




        // Adding the Numbers to artboard_list
        for (i = 0; i < chunks.length; i++) {


            hyphen_index = chunks[i].indexOf("-")
            if (hyphen_index == -1) {
                    num = Number(chunks[i]) - 1
                if (num >= doc.artboards.length) {
                    alert("The artboard range contains " + (num + 1) + ", but the document only has " + (doc.artboards.length) + " artboards.")
                    return success
                } else if (isNaN(num)) {

                    alert("Please enter a comma-separated list of numbers and ranges (e.g. 1, 2, 4-5, 8)")
                    return success

                }
                    artboard_list.push(num)

            } else {


                    begin = Number(chunks[i].substring(0, hyphen_index))
                    end = Number(chunks[i].substring(hyphen_index + 1))
                if (isNaN(begin) || isNaN(end)) {

                    alert("Please enter a comma-separated list of numbers and ranges (e.g. 1, 2, 4-5, 8)")
                    return success

                }


                for (j = begin; j <= end; j++) {


                    artboard_list.push(j - 1)


                }




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
        window.update();
        export_file();
    } catch (err) {
        alert(err)
        export_button.text = 'Export';
        window.update();
    }
}




function export_file() {
    

    if (!create_paths()) { export_button.text = "Export";  return; }




    // Creating Save Options




    if (file_type_dropdown.selection.toString() == 'PNG') {

        export_options = new ExportOptionsPNG24()
        type = ExportType.PNG24




    } else if (file_type_dropdown.selection.toString() == 'JPG') {

        export_options = new ExportOptionsJPEG()
        type = ExportType.JPEG




    } else if (file_type_dropdown.selection.toString() == 'AI') {

        save_options = new IllustratorSaveOptions()




    } else {




        export_options = new ExportOptionsSVG()
        type = ExportType.SVG
        export_options.artboardRange = artboard_radio_range_edittext.text




    }








    //Deciding Document Resolution
    if (file_type_dropdown.selection.toString() == 'PNG' || file_type_dropdown.selection.toString() == 'JPG') {




        res = 72




        if (resolution_dropdownlist.selection == 1) {

            res = 150





        } else if (resolution_dropdownlist.selection == 2) {
            res = 300




        }




        export_options.verticalScale = res * (100.0 / 72.0)
        export_options.horizontalScale = res * (100.0 / 72.0)
    }


    if (!get_artboard_list()) { export_button.text = "Export"; window.update(); return; }

    // Actually Exporting the Documents
    if (file_type_dropdown.selection.toString() == 'AI') {
        
        try {
            for (i1 = 0; i1 < file_path_list.length; i1++) {
                if (!artboard_checkbox.value) {
                    exp_file = File(file_path_list[i1])
                    doc.saveAs(exp_file, save_options)
                } else { 

                    save_options.saveMultipleArtboards = true

                    for (j = 0; j < artboard_list.length; j++) {

                        doc.artboards.setActiveArtboardIndex(artboard_list[j])
                        exp_file = File(file_path_list[i1].substring(0, file_path_list[i1].length - 3) + "_" + (j+1) + "." + file_type_dropdown.selection.toString().toLowerCase())
                        doc.saveAs(exp_file, save_options)


                    }


                }


            }
        } catch (err) {alert(err); export_button.text = "Export"; window.update(); return;}
    } else {

        try {

            for (i1 = 0; i1 < file_path_list.length; i1++) {
                if (!artboard_checkbox.value) {


                    exp_file = File(file_path_list[i1])
                    doc.exportFile(exp_file, type, export_options)
                    alert(file_path_list[i1])


                } else { 

                    for (j = 0; j < artboard_list.length; j++) {


                        export_options.artBoardClipping = true

                        doc.artboards.setActiveArtboardIndex(artboard_list[j])
                        exp_file = File(file_path_list[i1].substring(0, file_path_list[i1].length - 4) + "_" + (j+1) + "." + file_type_dropdown.selection.toString().toLowerCase())

                        doc.exportFile(exp_file, type, export_options)


                    }


                }


            }
    } catch (err) {alert(err); export_button.text = "Export"; window.update(); return;}




    }


    save_prefs()

    window.close()




}
















// Showing the Window


window.show()
