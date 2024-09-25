/**
 * 
 * Client - Nill
 * 
 * * OTP 7884 - Overdue Warning
 * 
 * 
 * ------------------------------------------------------------------------
 * 
 * Author : Jobin And Jismi IT Services
 * 
 * Date Created : 13 - September - 2024
 * 
 * Description : This displays a warning message when a sales Order is created for a customer who have Overdue
 * 
 * 
 *  REVISION HISTORY : 1.0
 * 
 * 
 * 
 * ------------------------------------------------------------------------
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/ui/message'],
    /**
     * @param{record} record
     * @param{message} message
     */
    function(record, message) {
        
        
        /**
         * Validation function to be executed when record is saved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @returns {boolean} Return true if record is valid
         *
         * @since 2015.2
         */
        function saveRecord(scriptContext) {
    
            
            let myRecord = scriptContext.currentRecord;
            let custName = myRecord.getValue({ fieldId: 'entity' });
            if (custName) {
                let amountOverdue = getCustomerOverdueBalance(custName);
                if (amountOverdue > 0) {
                    displayWarningMessage(amountOverdue);
    
                    let proceed = window.confirm('The customer has an overdue balance of ' + amountOverdue + '. Do you want to proceed with the order?');
    
                    if (!proceed) {
                        return false; // Prevent the record from being saved
                    }
    
                    
    
    
                } else {
                    log.debug('No Overdue');
                }
            }
            return true; // Ensure the sales order is created
        
        }
    
        return {
            saveRecord: saveRecord
        };
    


/**
 * Retrieves the overdue balance for a specified customer.
 *
 * @param {number} custName - The internal ID of the customer for whom to retrieve the overdue balance.
 * @returns {number} The overdue balance of the customer, or 0 if not found or an error occurs.
 * @throws {Error} Throws an error if the customer record cannot be loaded.
 */
        
    
        function getCustomerOverdueBalance(custName) {
            try{
            let customerOverdue = record.load({
                type: record.Type.CUSTOMER,
                id: custName
            });
            return customerOverdue.getValue('overduebalance');
        }
        catch(error)
        {
            log.debug(error);
        }
        }


/**
 * Displays a warning message indicating the customer's overdue balance.
 *
 * @param {number} amountOverdue - The amount of the overdue balance to be displayed in the warning message.
 * @returns {void}
 * @throws {Error} Throws an error if the message cannot be created or displayed.
 */
    
        function displayWarningMessage(amountOverdue) {
            try{
            let myMsg3 = message.create({
                title: "Warning",
                message: 'The customer has an overdue balance of ' + amountOverdue,
                type: message.Type.WARNING
            });
            myMsg3.show({
                duration: 100000 // Duration in milliseconds
            });
        }
        catch(error)
        {
            log.debug(error);
        }
        }
        
    });
    