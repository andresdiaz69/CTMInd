# View: vw_InformesProductividadAsesoresComerciales

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[UnidadDeNegocio]]

```sql
CREATE view vw_InformesProductividadAsesoresComerciales as
select Año,Mes,CodUnidadNegocio,NombreUnidadNegocio,Cedula=CedulaAsesorServicioResponsable,TipoCargo=TipoIntCargo,ValorNeto
from(
		select Año=year(t.FechaFactura),Mes=month(t.FechaFactura),u.CodUnidadNegocio,u.NombreUnidadNegocio,t.CedulaAsesorServicioResponsable,
		TipoIntCargo=   case when t.TipoIntCargo = 'A' then 'Alistamiento'
							 when t.TipoIntCargo = 'C' then 'Cliente'
							 when t.TipoIntCargo = 'G' then 'Garantias'
							 when t.TipoIntCargo = 'GA' then 'Garantias'
							 when t.TipoIntCargo = 'I' then 'Internos'
							 when t.TipoIntCargo = 'S' then 'Aseguradora'  end,
		ValorNeto=sum(t.ValorNeto)
		from ComisionesSpigaTallerPorOT		t
		left join UnidadDeNegocio			u	on	t.CodigoEmpresa = u.CodEmpresa
													and t.CodigoCentro = u.CodCentro
													and t.CodigoSeccion = u.CodSeccion
		where t.CodigoCentro not in (48,78)
		--and t.Ano_Periodo = 2021
		--and t.Mes_Periodo = 2
		and u.CodUnidadNegocio is not null
		--and t.TipoIntCargo <> 'G'
		group by year(t.FechaFactura),month(t.FechaFactura),t.CodigoEmpresa,t.empresa,t.CodigoCentro,t.centro,t.CodigoSeccion,t.Seccion,t.TipoIntCargo,
		t.CedulaAsesorServicioResponsable,u.CodCentro,u.NombreCentro,u.CodUnidadNegocio,u.NombreUnidadNegocio,t.CodigoSeccion,t.Seccion
		--order by CedulaAsesorServicioResponsable

		union all

		select año,mes,n.CodUnidadNegocio,n.NombreUnidadNegocio,CedulaAsesorServicioResponsable,
		TipoIntCargo=   case when TipoIntCargo = 'A' then 'Alistamiento'
							 when TipoIntCargo = 'C' then 'Cliente'
							 when TipoIntCargo = 'G' then 'Garantias'
							 when TipoIntCargo = 'GA' then 'Garantias'
							 when TipoIntCargo = 'I' then 'Internos'
							 when TipoIntCargo = 'S' then 'Aseguradora'  end,
		ValorNeto=sum(ValorNeto)
		from(
				select Año=year(t.FechaFactura),Mes=month(t.FechaFactura),u.CodUnidadNegocio,u.NombreUnidadNegocio,t.CodigoSeccion,t.Seccion,
				t.CedulaAsesorServicioResponsable,t.TipoIntCargo,ValorNeto=sum(t.ValorNeto)
				from ComisionesSpigaTallerPorOT		t
				left join UnidadDeNegocio			u	on	t.CodigoEmpresa = u.CodEmpresa
															and t.CodigoCentro = u.CodCentro
															and t.CodigoSeccion = u.CodSeccion
				where t.CodigoCentro not in (48,78)
				--and t.Ano_Periodo = 2021
				--and t.Mes_Periodo = 2
				and u.CodUnidadNegocio is  null
				--and t.TipoIntCargo <> 'G'
				group by year(t.FechaFactura),month(t.FechaFactura),t.CodigoEmpresa,t.empresa,t.TipoIntCargo,
				t.CedulaAsesorServicioResponsable,u.CodCentro,u.NombreCentro,u.CodUnidadNegocio,u.NombreUnidadNegocio,t.CodigoSeccion,t.Seccion
			--	order by CedulaAsesorServicioResponsable
		) a	left join UnidadDeNegocio		n	on	a.CodigoSeccion = n.CodSeccion
		group by año,mes,n.CodUnidadNegocio,n.NombreUnidadNegocio,CodigoSeccion,Seccion,CedulaAsesorServicioResponsable,TipoIntCargo
)b
```
