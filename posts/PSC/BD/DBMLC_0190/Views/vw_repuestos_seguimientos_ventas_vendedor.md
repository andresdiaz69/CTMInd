# View: vw_repuestos_seguimientos_ventas_vendedor

## Usa los objetos:
- [[vw_repuestos_seguimientos_ventas]]

```sql
CREATE VIEW [dbo].[vw_repuestos_seguimientos_ventas_vendedor] AS
SELECT Año,Mes,TipoMovimiento,Cedula,Nombres,valor=SUM(valor),CodigoSedeRepuestos,sede
FROM
(
	SELECT DISTINCT Año=ano_spiga,Mes=mes_spiga,TipoMovimiento=tipomov,Cedula,Nombres,valor,CodigoSedeRepuestos,sede
	FROM(
		SELECT ano_spiga,mes_spiga,tipomov,Cedula=cedulavendedorrepuestos,Nombres=NombreVendedorRepuestos,valor=SUM(Valor),CodigoSedeRepuestos,sede
		FROM vw_repuestos_seguimientos_ventas
		GROUP BY ano_spiga,mes_spiga,tipomov,cedulavendedorrepuestos,NombreVendedorRepuestos,CodigoSedeRepuestos,sede
		--UNION ALL
		--SELECT ano_spiga,mes_spiga,tipomov,cedula=cedulabodeguero,Nombres=nombrebodeguero,valor=SUM(Valor),CodigoSedeRepuestos,sede
		--FROM vw_repuestos_seguimientos_ventas
		--WHERE CedulaVendedorRepuestos<>CedulaBodeguero 
		--GROUP BY ano_spiga,mes_spiga,tipomov,cedulabodeguero,nombrebodeguero,CedulaVendedorRepuestos,CodigoSedeRepuestos,sede
	) a 
)a 
--where Año=2020
--and  CodigoSedeRepuestos = 11
GROUP BY Año,Mes,TipoMovimiento,Cedula,Nombres,CodigoSedeRepuestos,sede


```
