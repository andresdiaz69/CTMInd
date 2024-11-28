# Stored Procedure: sp_Vacaciones_DiasPendientes

```sql




CREATE procedure [dbo].[sp_Vacaciones_DiasPendientes]
	@CodEmp as bigint,
	@FechaLiq as datetime,
	@Opcion as int
as
begin
SET NOCOUNT ON
SET FMTONLY OFF

if @CodEmp <> 89109449

EXEC [novasoft_ct_mm].dbo.sp_executesql
N'SELECT * FROM [novasoft_ct_mm].[dbo].[fn_rhh_CauVacEmp] (@CodEmp, @FechaLiq, @Opcion)',
N'@CodEmp bigint, @FechaLiq datetime, @Opcion int',
@CodEmp, @FechaLiq, @Opcion

else

--el pasaporte de Dairinet empieza por 0
EXEC [novasoft_ct_mm].dbo.sp_executesql
N'SELECT * FROM [novasoft_ct_mm].[dbo].[fn_rhh_CauVacEmp] (''089109449'', @FechaLiq, @Opcion)',
N'@FechaLiq datetime, @Opcion int',
@FechaLiq, @Opcion

end

```
