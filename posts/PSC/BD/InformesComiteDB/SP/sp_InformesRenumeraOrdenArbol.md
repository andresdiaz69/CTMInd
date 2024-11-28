# Stored Procedure: sp_InformesRenumeraOrdenArbol

## Usa los objetos:
- [[InformesArboles]]

```sql
create  PROCEDURE [dbo].[sp_InformesRenumeraOrdenArbol]

AS
BEGIN

	SET NOCOUNT ON;

	DECLARE @nivel1 as smallint,@nivel2 as smallint,@nivel3 as smallint,@nivel4 as smallint,@nivel5 as smallint,@nivel6 as smallint
	DECLARE @i as smallint,@Balance as smallint

	set @Balance = 17
	set @i = 10 
  


	-- Renumera PYG

	DECLARE contact_cursor CURSOR FOR  
	SELECT nivel1,nivel2,nivel3,nivel4,nivel5,nivel6 FROM InformesArboles
	WHERE Balance=@Balance
	ORDER BY nivel1,nivel2,nivel3,nivel4,nivel5,nivel6  

	OPEN contact_cursor;  

	FETCH NEXT FROM contact_cursor  
	INTO @nivel1,@nivel2,@nivel3,@nivel4,@nivel5,@nivel6  
  
	-- Check @@FETCH_STATUS to see if there are any more rows to fetch.  
	WHILE @@FETCH_STATUS = 0  
	BEGIN   
		-- Concatenate and display the current values in the variables.
		if @nivel1 <> 0 begin
			update InformesArboles set Orden = @i
			where Balance = @Balance and nivel1=@nivel1 and nivel2=@nivel2 and nivel3=@nivel3 and nivel4=@nivel4 and nivel5=@nivel5 and nivel6=@nivel6 
			set @i = @i + 10
		end
		else begin
			update InformesArboles set Orden = 0
			where Balance = @Balance and nivel1=@nivel1 and nivel2=@nivel2 and nivel3=@nivel3 and nivel4=@nivel4 and nivel5=@nivel5 and nivel6=@nivel6 
		end
       

		-- This is executed as long as the previous fetch succeeds.  
		FETCH NEXT FROM contact_cursor  
		INTO @nivel1,@nivel2,@nivel3,@nivel4,@nivel5,@nivel6   
	END  
  
	CLOSE contact_cursor;  
	DEALLOCATE contact_cursor;  



	-- Renumera Balance
	set @Balance = 18
	set @i = 10 

	DECLARE contact_cursor CURSOR FOR  
	SELECT nivel1,nivel2,nivel3,nivel4,nivel5,nivel6 FROM InformesArboles
	WHERE Balance=@Balance
	ORDER BY nivel1,nivel2,nivel3,nivel4,nivel5,nivel6  

	OPEN contact_cursor;  
  
	FETCH NEXT FROM contact_cursor  
	INTO @nivel1,@nivel2,@nivel3,@nivel4,@nivel5,@nivel6  
  
	-- Check @@FETCH_STATUS to see if there are any more rows to fetch.  
	WHILE @@FETCH_STATUS = 0  
	BEGIN  
  
	   -- Concatenate and display the current values in the variables.  
	   if @nivel1 <> 0 begin
			update InformesArboles set Orden = @i
			where Balance = @Balance and nivel1=@nivel1 and nivel2=@nivel2 and nivel3=@nivel3 and nivel4=@nivel4 and nivel5=@nivel5 and nivel6=@nivel6 
			set @i = @i + 10
		end
		else begin
			update InformesArboles set Orden = 0
			where Balance = @Balance and nivel1=@nivel1 and nivel2=@nivel2 and nivel3=@nivel3 and nivel4=@nivel4 and nivel5=@nivel5 and nivel6=@nivel6 
		end

	   -- This is executed as long as the previous fetch succeeds.  
		FETCH NEXT FROM contact_cursor  
		INTO @nivel1,@nivel2,@nivel3,@nivel4,@nivel5,@nivel6   
	END  
  
	CLOSE contact_cursor;  
	DEALLOCATE contact_cursor;  
	

end
--	select * from InformesArboles order by Balance,orden
```
