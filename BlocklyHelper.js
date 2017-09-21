/**
*	File: BlocklyHelper.js
**/
var bh_toolboxXml = '';
var bh_toolboxXmlCurrent = '';


//--
// XML ForEachByTagName
//--
function xmlForEachByTagName(xml, tagName, func) {
	nodes = xml.getElementsByTagName(tagName);
	for(i = 0; i < nodes.length; i++) {
		if(func(nodes[i]) == false) {
			return;
		}
	}
}


//--
// Load Toolbox XML from document by Element ID
//--
function BlocklyHelper_init(workspace, toolboxId, mode) {
	bh_toolboxXml = document.getElementById(toolboxId);
	bh_toolboxXmlCurrent = bh_toolboxXml.cloneNode(true);

	workspace.addChangeListener(BlocklyHelper_Listener);

	if(mode != '') {
		BlocklyHelper_ToolboxMode(workspace, mode);
	}

	workspace.updateToolbox(bh_toolboxXmlCurrent);
}


//--
// Change the Toolbox to a specific mode
//--
function BlocklyHelper_ToolboxMode(workspace, mode) {
	bh_toolboxXmlCurrent = bh_toolboxXml.cloneNode(true);
	
	f = function(n) {
		modeVal = n.getAttribute('mode');
		if(modeVal != null && modeVal != '' && modeVal != mode) {
			n.parentNode.removeChild(n);
		}
	};
	
	xmlForEachByTagName(bh_toolboxXmlCurrent, 'category', f);
	xmlForEachByTagName(bh_toolboxXmlCurrent, 'block', f);

	workspace.updateToolbox(bh_toolboxXmlCurrent);
}


//--
// Disable Block by type
//--
function BlocklyHelper_DisableBlock(workspace, type, disable) {
	f = function(node) {
		if(node.getAttribute('type') == type) {
			node.setAttribute('disabled', disable);
		}
	}

	xmlForEachByTagName(bh_toolboxXml, 'block', f);
	xmlForEachByTagName(bh_toolboxXmlCurrent, 'block', f);
	
	workspace.updateToolbox(bh_toolboxXmlCurrent);
}


//--
// Blockly Listener callback to update toolbox
//--
function BlocklyHelper_Listener(event) {
	found = false;
	disable = true;
	xml = null;

	f = function(n) {
		if(n.getAttribute('type') == xml.attributes.getNamedItem('type').value) {
			if(n.getAttribute('singleton') == 'true') {
				n.setAttribute('disabled', disable);
				found = true;
			} else {
				return false;
			}
		}
	}

	if(event.type == Blockly.Events.BLOCK_CREATE) {
		disable = true;
		xml = event.xml;
		
		xmlForEachByTagName(bh_toolboxXmlCurrent, 'block', f);
		if(found) xmlForEachByTagName(bh_toolboxXml, 'block', f);
	} else if(event.type == Blockly.Events.BLOCK_DELETE) {
		disable = false;
		xml = event.oldXml;
		
		xmlForEachByTagName(bh_toolboxXmlCurrent, 'block', f);
		if(found) xmlForEachByTagName(bh_toolboxXml, 'block', f);
	}
}
