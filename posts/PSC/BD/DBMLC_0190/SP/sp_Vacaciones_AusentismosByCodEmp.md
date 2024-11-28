# Stored Procedure: sp_Vacaciones_AusentismosByCodEmp

## Usa los objetos:
- [[rhh_ausentismo]]

```sql

CREATE procedure [dbo].[sp_Vacaciones_AusentismosByCodEmp]
	@codEmp as nvarchar(50), @fecha as datetime
as 
begin
	set nocount on 
	select * from [novasoft_Ct_mm].[dbo].[rhh_ausentismo] 
	where cod_emp = @codEmp and @fecha between ini_aus and fin_aus
end

```
