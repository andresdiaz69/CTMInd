# Stored Procedure: sp_spiga_facturas_recibidas

## Usa los objetos:
- [[Asientos]]
- [[Centros]]

```sql
CREATE PROCEDURE [dbo].[sp_spiga_facturas_recibidas] 
	-- Add the parameters for the stored procedure here
	@fecha_inferior as date,
	@fecha_superior as date
AS
BEGIN

select ano,mes,pkfkempresas,
marca =CASE WHEN CHARINDEX('-', Marca) = 0 THEN Marca ELSE LEFT(Marca, CHARINDEX('-', Marca) - 1) END,
cantidad = count(NumFactura),nombre,FkAsientoGestionEliminacion
from(
		SELECT distinct ano=year(a.FechaAsiento), mes=month(a.FechaAsiento),--a.FkAsientoTipos,a.NumeroAsiento_Iden,
		a.Fkcentros,c.nombre,
		Marca=replace(replace(replace(replace(replace(replace(c.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
		a.FkSeries,a.NumFactura,a.FkAsientoGestionEliminacion,a.PkFkEmpresas
		FROM		[192.168.90.10\SPIGAPLUS].[DMS00280].FI.Asientos	a	with(nolock)
		left join	[192.168.90.10\SPIGAPLUS].[DMS00280].cm.centros	c	on a.FkCentros = c.Pkcentros
		where a.FechaBaja is null 
		and a.FkFacturaTipos='R' 
		and PkFkEmpresas in (1,2,3,4,5,6,22)
		and a.FechaAsiento >=  @fecha_inferior 
		and a.FechaAsiento <= @fecha_superior
)a group by ano,mes,pkfkempresas,marca,nombre,FkAsientoGestionEliminacion
--select top 100 * FROM FI.Asientos 
end



```
