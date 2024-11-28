# Stored Procedure: sp_CuadroDePersonal_CausalesDeRetiro

## Usa los objetos:
- [[EmpleadosRetirados]]

```sql
CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_CausalesDeRetiro]
	@Ano_Periodo as int,
	@mes_Periodo as int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		SET FMTONLY OFF

select CausaRetiro as [CAUSAS DE RETIRO],
[BONAPARTE RAL],[CASA TORO DE LA SABANA], [CASATORO S.A.],
[Fomenta] as FOMENTA,[Israriego] as ISRARIEGO,[MOTORES Y MAQUINAS S.A. - MOTORYSA] as MOTORYSA,
[BELLPI SAS] as BELLPI,1 as orden
--into #tabla1
from(
		select CausaRetiro, empresa, Codigoempleado
		from EmpleadosRetirados 
		where Ano_Periodo =	@Ano_Periodo
		 and Mes_Periodo <= @mes_Periodo
) a pivot (count(codigoempleado) for empresa in 
([BONAPARTE RAL],[CASA TORO DE LA SABANA],[CASATORO S.A.],[Fomenta],[Israriego],[MOTORES Y MAQUINAS S.A. - MOTORYSA],[BELLPI SAS])) as pivottable


END

```
