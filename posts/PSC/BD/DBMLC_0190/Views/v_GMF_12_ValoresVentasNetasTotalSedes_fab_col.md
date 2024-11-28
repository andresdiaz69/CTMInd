# View: v_GMF_12_ValoresVentasNetasTotalSedes_fab_col

## Usa los objetos:
- [[UnidadDeNegocio_Presentaciones]]
- [[v_GMF_10_ValoresVentasNetas]]
- [[v_GMF_10_ValoresVentasNetas_Colision]]
- [[v_GMF_10_ValoresVentasNetas_FabricaColision]]

```sql

CREATE view [dbo].[v_GMF_12_ValoresVentasNetasTotalSedes_fab_col]  as
select año,mes,empresa,Codigoconcepto,nombreconcepto,IdSede, sede,CodPresentacionprincipal,--Codigocentro,NombreCentro,
ValorCentro=case when sum(ValorCentro) <> 0 then sum(ValorCentro) -sum(ValorFabrica)-sum(ValorColision) else sum(Valorcentro) end,
ValorFabrica=sum(ValorFabrica),ValorColision=sum(ValorColision)
from(
		select Año,Mes,Empresa,CodigoConcepto,NombreConcepto,IdSede = CodSedeAgrupada, Sede=NombreSedeAgrupada,Codigocentro,NombreCentro,CodPresentacionprincipal,
		valorCentro,ValorFabrica,ValorColision
		from(
				select distinct n.Empresa, n.CodigoPresentacion, n.nombrepresentacion, n.Año, n.Mes, n.CodigoConcepto, n.NombreConcepto, n.Sede, 
				n.CodigoCentro, n.NombreCentro, p.CodSedeAgrupada, p.NombreSedeAgrupada,p.CodPresentacionprincipal,ValorCentro=n.Valor,ValorFabrica=0,ValorColision=0
				from		v_GMF_10_ValoresVentasNetas						n 
				left join	UnidadDeNegocio_Presentaciones							p	on		n.Empresa=p.CodEmpresa and n.codigocentro = p.codcentro
																						and n.sede = p.nombresedepresentacion
				--where n.Año = 2021 
				--and n.mes= 2 
				--and n.nombrepresentacion = 'Ford' 
				union all
				select distinct n.Empresa, n.CodigoPresentacion, n.nombrepresentacion, n.Año, n.Mes, n.CodigoConcepto, n.NombreConcepto, n.Sede, 
				n.CodigoCentro, n.NombreCentro, p.CodSedeAgrupada, p.NombreSedeAgrupada,p.CodPresentacionprincipal,ValorCentro=0,ValorFabrica=n.Valor,ValorColision=0
				from		v_GMF_10_ValoresVentasNetas_FabricaColision		n 
				left join	UnidadDeNegocio_Presentaciones							p	on		n.Empresa=p.CodEmpresa and n.codigocentro = p.codcentro
																						and n.sede = p.nombresedepresentacion
				--where n.Año = 2021 
				--and n.mes= 2 
				--and (n.sede like '%Ford%' or n.sede like '%FR%') 
				union all
				select distinct n.Empresa, n.CodigoPresentacion, n.nombrepresentacion, n.Año, n.Mes, n.CodigoConcepto, n.NombreConcepto, n.Sede, 
				n.CodigoCentro, n.NombreCentro, p.CodSedeAgrupada, p.NombreSedeAgrupada,p.CodPresentacionprincipal,ValorCentro=0,ValorFabrica=0,ValorColision=n.Valor
				from		v_GMF_10_ValoresVentasNetas_Colision		n 
				left join	UnidadDeNegocio_Presentaciones						p	on		n.Empresa=p.CodEmpresa and n.codigocentro = p.codcentro
																					and n.sede = p.nombresedepresentacion
				--where n.Año = 2021 
				--and n.mes= 2 
				--and (n.sede like '%Ford%' or n.sede like '%FR%') 
		) a
)b --where sede ='FR-Bta-Cl.170' 
group by año,mes,empresa,Codigoconcepto,nombreconcepto,IdSede,sede,CodPresentacionprincipal  --,Codigocentro,NombreCentro
	

```
