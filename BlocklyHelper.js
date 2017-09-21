/**
 * @file Blockly Helper class
 * @author James Collins
 * @version 0.8
 *
 */

function BlocklyHelper(workspace, toolboxXml) {
	this._workspace = workspace;
	this._toolboxXml = toolboxXml;

/**
  * Change the toolbox mode
  * @param {string} Show categories/blocks that are blank or set to mode
  */
  	this.toolboxMode = (function(mode) {
		var updated = false;
	
		var nodes = this._toolboxXml.getElementsByTagName("*");
		for(var i = 0; i < nodes.length; i++) {
			if((nodes[i].tagName == "CATEGORY" || nodes[i].tagName == "BLOCK") && (nodes[i].hasAttribute("mode"))) {
			 	if(nodes[i].getAttribute("mode") != mode) {
			 		if(nodes[i].getAttribute("hidden") != "true") {
			 			nodes[i].setAttribute("hidden", "true");
			 			updated = true;
			 		}
			 	} else {
			 		if(nodes[i].getAttribute("hidden") == "true") {
			 			nodes[i].setAttribute("hidden", "false");
			 			updated = true;
			 		}
			 	}
			}
		}
		
		if(updated == true) {
			this.toolboxUpdate();
		}
	}).bind(this);
	

/**
  * Disable/Enable a block in the toolbox
  * @param {string} Block type to disable/enable
  * @param {boolean} Disable or enable the block
  */
	this.blockDisable = (function(type, disabled) {
		var updated = false;
	
		var nodes = this._toolboxXml.getElementsByTagName("block");
		for(var i = 0; i < nodes.length; i++) {
			if(nodes[i].getAttribute("type") == type) {
				if(nodes[i].getAttribute("disabled") != disabled) {
					nodes[i].setAttribute("disabled", disabled);
					update = true;
				}
			}
		}

		if(updated == true) {
			this.toolboxUpdate();
		}
	}).bind(this);


/**
  * Update the blockly toolbox
  */
	this.toolboxUpdate = (function() {
		var xml = this._toolboxXml.cloneNode(true);

		var nodes = xml.getElementsByTagName("category");
		for(var i = 0; i < nodes.length; i++) {
			if(nodes[i].getAttribute("hidden") == "true") {
				nodes[i].parentNode.removeChild(nodes[i]);
			}
		}

		var nodes = xml.getElementsByTagName("block");
		for(var i = 0; i < nodes.length; i++) {
			if(nodes[i].getAttribute("hidden") == "true") {
				nodes[i].parentNode.removeChild(nodes[i]);
			}
		}
		
		this._workspace.updateToolbox(xml);
	}).bind(this);
	

/**
  * (Private) Blockly workspace change listener
  * @param {object} event data passed from Google Blockly workspace
  */
	this._changeListener = (function(e) {
		var updated = false;

		if(e.type == Blockly.Events.BLOCK_CREATE) {
			var nodes = this._toolboxXml.getElementsByTagName("block");
			for(var i = 0; i < nodes.length; i++) {
				if(nodes[i].getAttribute("type") == e.xml.attributes.getNamedItem("type").value && nodes[i].getAttribute("singleton") == "true") {
					nodes[i].setAttribute("disabled", "true");
					updated = true;
				}
			}
		} else if(e.type == Blockly.Events.BLOCK_DELETE) {
			var nodes = this._toolboxXml.getElementsByTagName("block");
			for(var i = 0; i < nodes.length; i++) {
				if(nodes[i].getAttribute("type") == e.oldXml.attributes.getNamedItem("type").value && nodes[i].getAttribute("singleton") == "true") {
					nodes[i].setAttribute("disabled", "false");
					updated = true;
				}
			}
		}
		
		if(updated == true) {
			this.toolboxUpdate();
		}
	}).bind(this);

/** rest of initialisation code **/
	this._workspace.addChangeListener(this._changeListener);
	this.toolboxUpdate();
}
