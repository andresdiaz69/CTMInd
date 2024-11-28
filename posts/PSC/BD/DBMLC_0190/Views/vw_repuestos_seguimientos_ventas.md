# View: vw_repuestos_seguimientos_ventas

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[SedesRepuestos]]

```sql
CREATE VIEW [dbo].[vw_repuestos_seguimientos_ventas] AS
select  Ano_Spiga,Mes_Spiga,CodigoSedeRepuestos,sede,empresa,centro,seccion,TipoMov,CedulaVendedorRepuestos,NombreVendedorRepuestos,CedulaBodeguero,NombreBodeguero,Valor=sum(valor)
from(
		select Ano_Spiga,Mes_Spiga,
		r.CodigoSedeRepuestos,
		Sede = case when r.CodigoCentro is null then a.Centro else r.NombreSedeRepuestos end ,
		a.CodigoEmpresa,Empresa,a.CodigoCentro,centro,a.CodigoSeccion,a.seccion,TipoMov,CodClasificacion1Mov,Clasificacion1Mov,
		CedulaVendedorRepuestos,NombreVendedorRepuestos,CedulaBodeguero,NombreBodeguero,Valor
		from(
			select Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoCentro,centro,CodigoSeccion,
			seccion=replace(replace(replace(replace(replace(replace(seccion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
			TipoMov,CodClasificacion1Mov,Clasificacion1Mov,
			CedulaVendedorRepuestos,NombreVendedorRepuestos,CedulaBodeguero,NombreBodeguero,Valor=sum(ValorNeto)
			from ComisionesSpigaAlmacenAlbaran
			group by Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoCentro,centro,CodigoSeccion,seccion,TipoMov,CodClasificacion1Mov,Clasificacion1Mov,
			CedulaVendedorRepuestos,NombreVendedorRepuestos,CedulaBodeguero,NombreBodeguero
			union all
			select distinct Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoCentro,centro,CodigoSeccion,
			seccion=replace(replace(replace(replace(replace(replace(seccion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
			TipoIntCargo,CodClas1,DescripClas1,
			CedulaVendedorRepuestos,NombreVendedorRepuestos,CedulaBodeguero,NombreBodeguero,
			Valor=sum(ValorNeto)
			from ComisionesSpigaTallerPorOT
			where TipoOperacion = 'MAT'
			group by  Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoCentro,centro,CodigoSeccion,seccion,TipoIntCargo,CodClas1,DescripClas1,CedulaVendedorRepuestos,NombreVendedorRepuestos,
			CedulaBodeguero,NombreBodeguero
		) a left join SedesRepuestos		r	on	a.CodigoEmpresa = r.CodigoEmpresa and a.CodigoCentro = r.CodigoCentro and a.CodigoSeccion = r.CodigoSeccion
) b
group by Ano_Spiga,Mes_Spiga,CodigoSedeRepuestos,sede,empresa,centro,seccion,TipoMov,CedulaVendedorRepuestos,NombreVendedorRepuestos,CedulaBodeguero,NombreBodeguero

```
