# Stored Procedure: sp_GetErrorInfo

```sql

CREATE PROCEDURE [dbo].[sp_GetErrorInfo]  
	@Msg as varchar(250) = ''
AS  
SELECT  
    ERROR_NUMBER() AS ErrorNumber  
    ,ERROR_SEVERITY() AS ErrorSeverity  
    ,ERROR_STATE() AS ErrorState  
    ,ERROR_PROCEDURE() AS ErrorProcedure  
    ,ERROR_LINE() AS ErrorLine  
    ,ERROR_MESSAGE() AS ErrorMessage
	,@Msg;

	print ERROR_NUMBER() 
    print ERROR_SEVERITY()
    print ERROR_STATE()
    print ERROR_PROCEDURE()
    print ERROR_LINE()
    print ERROR_MESSAGE()
	print @Msg

```
