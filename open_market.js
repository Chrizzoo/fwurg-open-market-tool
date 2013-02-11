// Wrap the whole thing in a scope
// (Only function activations are scopes in JavaScript, so get used
//  to any 'var foo' declarations being useful only on function
//  level. If you leave out the 'var' keyword, the variable will be
//  global, and things will not behave as you expect them.)
(function($){
	// inititalize private variables to inert values
	var goods = [];
	
	var getTaxIcon = function(amount) {
		return fwurg.icons.draw('(:tax'+(amount<0?'+out':'+in')+')');
	};
	
	/**
	 * This function calculates the total value of the
	 * transaction.
	 */
	var updateTotal = function() {
		// we keep a running total for the tax
		var total = 0;
		
		// another running total for the amount of goods
		var goods_total = 0;
		
		// and then just run through the goods
		$.each(goods, function(i, item) {
			var sub_total = $('#amount' + i).val();
			
			goods_total += Math.abs(sub_total);
			
			sub_total *= (sub_total > 0 ? item.sell : item.buy);
			
			$('#tax' + i).html("" + (sub_total != 0 ? sub_total.toFixed(3) : 0) );
			
			total += sub_total;
		});
		
		$('#goods_total').html(""+goods_total + ' ' + fwurg.icons.draw('(:om-trade)'));
		
		$('#tax_total').html("" + (total != 0 ? total.toFixed(3) : 0));
		
		var tax = Math.abs(Math.floor(total)) + ' ' + getTaxIcon(total);
		$('#taxText').html(total > 0 ? "You get from the open market: ": "You have to pay the open market: ");
		$('#taxAmount').html(tax);
		
		// rebuild the template
		updateDataBlocks(Math.floor(total));
		
	};
	
	var updateDataBlocks = function(total_tax) {
		// template incoming trades.
		var incomingTemplate = [];
		// template outgoing trades.
		var outgoingTemplate = [];
		
		incomingTemplate = incomingTemplate.concat(["<data !trade #From Open Market>", "To_ref: YOUR_SYSTEM_NAME", "From: Open Market"]);
		outgoingTemplate = outgoingTemplate.concat(["<data !trade #To Open Market>", "To: Open Market", "From_ref: YOUR_SYSTEM_NAME"]);
		
		$.each(goods, function(i, item) {
			var amount = $('#amount' + i).val();
			
			if (amount > 0) {
				// selling to open market
				outgoingTemplate = outgoingTemplate.concat([item.name+': '+amount]);
				
			}
			else if(amount < 0) {
				// buying from open market
				var absolute_amount = Math.abs(amount);
				incomingTemplate = incomingTemplate.concat([item.name+': '+absolute_amount]);
			}			
		});
		// add the tax that you get or pay.
		if (total_tax > 0) {
			incomingTemplate = incomingTemplate.concat(['Tax: '+total_tax]);
				
		}
		else {
			outgoingTemplate = outgoingTemplate.concat(['Tax: '+Math.abs(total_tax)]);	
		}
		incomingTemplate = incomingTemplate.concat(['</data>', '']);
		outgoingTemplate = outgoingTemplate.concat(['</data>', '']);
		
		$('#templates').remove();
		
		$('#allGoods').append('<tr id="templates" class="tRow totalRow"><td colspan="6" class="totalLine"><textarea id="templatearea"></textarea></td></tr>');
		
		var templates = incomingTemplate.concat(outgoingTemplate);
		$('#templatearea').val(templates.join("\n"));
		
	}
	
	// We only muck around when the document is loaded
	$(document).ready(function() {
		// fetch the required Open Market data. This is asynchronous, so the
		// function in the then() call will be executed whenever the data becomes
		// available.
		// (We use .then() because getJSON returns a Promise interface and we 
		//  really like those.)
		$.getJSON('read_open_market.php').then(function(data) {
			// store goods for later use
			goods = data;
			
			// Now we create the table by appending the whole thing:
			// Start off with a nice header...
			$('#allGoods').append('<tr><th></th><th class="amountHeader">Amount</th><th></th><th class="sell">Sell</th><th class="buy">Buy</th><th class="amountHeader" style="width:80px">Tax</th></tr>');
			
			// ...followed by a row per item...
			$.each(goods, function(i, item) {
				var iconstr = '(:'+ item.name.toLowerCase().replace(/ /g, '-') +')';
				$('#allGoods').append(
					"<tr class='tRow' id='row" + i  + "'>" + 
					"<td id='name" + i + "'>" + fwurg.icons.draw(iconstr) + ' ' + item.name + "</td>" +
					"<td><input class='inputField' type='text' id='amount" + i + "' /></td>" +
					"<td>"+ fwurg.icons.draw(iconstr) + "</td>" +
					"<td class='sell' id='sell" + i + "'>" + item.sell + "</td>" +
					"<td class='buy' id='buy" + i + "'>" + item.buy + "</td>"+
					"<td class='tax_td' id='tax" + i + "'>0</td>" +
					"</tr>"
				);
			});
			
			// ...and closing with a nice total row.
			$('#allGoods').append('<tr class="tRow"><td colspan="5" class="totalLine">Total:</td><td class="tax_td" id="tax_total">0</td></tr>');	
			$('#allGoods').append('<tr class="tRow totalRow"><td colspan="5" id="taxText"></td><td class="tax_td" id="taxAmount">0</td></tr>');	
			$('#allGoods').append('<tr class="tRow totalRow"><td colspan="5" class="totalLine">Open market capacity required:</td><td class="tax_td" id="goods_total">0</td></tr>');
	
			
			// After we have created the table, attach a nice handler to all fields:
			// $('input').change(updateTotal);
			
			// whenever a key is released (this is here for immediateness)
			$('input').keyup(updateTotal);
			
			$('#loadbar').hide();
			$('#omTool').fadeIn();
		});
		
		
	});

// Now close the overall scope, and call the function with the
// canonical jQuery. This is to make sure that it works, even 
// when someone reassigns the '$' (it happens, the bastards!)
})(jQuery);
