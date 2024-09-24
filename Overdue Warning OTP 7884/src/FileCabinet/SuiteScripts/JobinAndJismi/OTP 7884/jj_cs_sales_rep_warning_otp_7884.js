/**
 * 
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
                } else {
                    log.debug('No Overdue');
                }
            }
            return true; // Ensure the sales order is created
        
        }
    
        return {
            saveRecord: saveRecord
        };
    
        
    
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
    