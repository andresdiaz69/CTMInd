# Stored Procedure: sp_VacacionesInforme

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_clasif5]]
- [[gen_compania]]
- [[gen_sucursal]]
- [[rhh_emplea]]
- [[vw_VacacionesConsolidados]]
- [[vw_VacacionesDiasHabilesYNoHabiles]]
- [[vw_VacacionesPagadas]]
- [[vw_VacacionesPagadasDinero]]
- [[vw_VacacionesPagasLiquidaciones]]
- [[vw_VacacionesProvisiones]]

```sql
CREATE procedure [dbo].[sp_VacacionesInforme] 
(
@Fecha			datetime,
@CodigoEmpresa	int 
)
as

--declare @fecha datetime
--declare @codigoempresa int
--set @fecha = '20201231'
--set @codigoempresa = 1


BEGIN
SET NOCOUNT ON;

SELECT CedulaEmpleado = r.cod_emp,NombreEmpleado=r.nom_emp + ' ' + r.ap1_emp + ' ' + r.ap2_emp,FechaLiquidacionConsolidado=c.FechaLiquidacion,
r.fec_ing,DiasCausados=isnull(c.DiasCausados,0), DiasTotalesVacaciones=isnull(c.DiasTotalesVacaciones,0),DiasPeriodoAcumulados=isnull(c.DiasPeriodoAcumulados,0), 
DiasPendientes=isnull(c.DiasPendientes,0),SalarioBasico=isnull(c.SalarioBasico,r.sal_bas),SalarioPromedio=isnull(c.SalarioPromedio,0), 
ValorVacaciones=isnull(c.ValorVacaciones,0),

ValorProvisionAnterior=isnull(c.ValorProvision,0), ValorVacacacionesPagadas=isnull(c.ValorVacacacionesPagadas,0), 

ValorDiferencia=isnull(c.ValorDiferencia,0),

ValorProvision=isnull(p.ValorProvision,0),diasvacaciones=isnull(pag.diasvacaciones,0),Valorvacacionespagadas=isnull(pag.Valorvacacionespagadas,0),

diashabiles= isnull(n.diashabiles,0),DiasNoHabiles=isnull(n.DiasNoHabiles,0),ValorDiasHabiles=isnull(n.ValorDiasHabiles,0),ValorDiasNoHabiles=isnull(n.ValorDiasNoHabiles,0),
DiasPagados=isnull(d.DiasPagados,0),ValorEnDinero=isnull(d.ValorEnDinero,0),DiasLiquidacion=isnull(l.DiasLiquidacion,0),ValorLiquidaciones=isnull(l.ValorLiquidaciones,0),
CodigoCompania = r.cod_cia,NombreCompania = cia.nom_cia,CodigoMarca = r.cod_suc, NombreMarca = s.nom_suc,CodigoCentro = r.cod_cco,NombreCentro = cc.nom_cco,CodigoSeccion = r.cod_cl1,
NombreSeccion = c1.nombre,CodigoDepartamento = r.cod_cl2,NombreDepartamento = c2.nombre,CodigoUnidadNegocio = r.cod_cl3,NombreUnidadNegocio = c3.nombre,CodigoSede = r.cod_cl5,NombreSede = c5.nombre
FROM			[Novasoft_CT_MM].dbo.rhh_emplea										r            
left join		vw_VacacionesConsolidados						c	on	CAST(LTRIM(RTRIM(r.cod_emp))AS BIGINT) = CAST(LTRIM(RTRIM(c.cedulaempleado))AS BIGINT)
																		 and year(c.fechaliquidacion) = year(@fecha) -1  
																		and month(c.fechaliquidacion) = 12
																		and day(c.fechaliquidacion)=31
left join		(select cedulaEmpleado,NombreEmpleado, ValorProvision=sum(ValorProvision)
				from [dbo].[vw_VacacionesProvisiones]
				--where year(Fechaliquidacion)=year(@fecha)
				where Fechaliquidacion<=@fecha
				group by cedulaEmpleado,NombreEmpleado )		p	on	CAST(LTRIM(RTRIM(r.cod_emp))AS BIGINT) = CAST(LTRIM(RTRIM(p.cedulaempleado))AS BIGINT)
left join		(select cedulaEmpleado,diasvacaciones=sum(diasvacaciones),Valorvacacionespagadas=sum(Valorvacacionespagadas)
				from [dbo].vw_VacacionesPagadas
				--where year(Fechaliquidacion)=year(@fecha)
				where Fechaliquidacion<=@fecha
				group by cedulaEmpleado)						pag	on	CAST(LTRIM(RTRIM(r.cod_emp))AS BIGINT) = CAST(LTRIM(RTRIM(pag.cedulaempleado))AS BIGINT)
left join		(select cedulaEmpleado,diashabiles=sum(Diashabiles),DiasNoHabiles=sum(DiasNoHabiles),
				ValorDiasHabiles=sum(ValorDiasHabiles),ValorDiasNoHabiles=sum(ValorDiasNoHabiles)
				from(		
						select cedulaEmpleado,DiasHabiles = case when Codigoconcepto = '000050' then sum(CAST(can_liq AS DECIMAL(34,2))) else 0 end,
						DiasNoHabiles = case when Codigoconcepto = '000051' then sum(can_liq) else 0 end,
						ValorDiasHabiles = case when Codigoconcepto = '000050' then sum(val_liq) else 0 end,
						ValorDiasNoHabiles = case when Codigoconcepto = '000051' then sum(val_liq) else 0 end
						from [dbo].vw_VacacionesDiasHabilesYNoHabiles
						--where year(Fechaliquidacion)=year(@fecha)
						where Fechaliquidacion<=@fecha
						group by cedulaEmpleado,Codigoconcepto
				) a group by cedulaempleado)					n	on	CAST(LTRIM(RTRIM(r.cod_emp))AS BIGINT) = CAST(LTRIM(RTRIM(n.cedulaempleado))AS BIGINT)
left join	(select cedulaempleado,DiasPagados=sum(can_liq),ValorEnDinero=sum(val_liq)
			from [dbo].vw_VacacionesPagadasDinero
			--where year(Fechaliquidacion)=year(@fecha)
			where Fechaliquidacion<=@fecha
			group by cedulaEmpleado)							d	on	CAST(LTRIM(RTRIM(r.cod_emp))AS BIGINT) = CAST(LTRIM(RTRIM(d.cedulaempleado))AS BIGINT)
left join	(select cedulaempleado,DiasLiquidacion=sum(can_liq),ValorLiquidaciones=sum(val_liq)
			from [dbo].vw_VacacionesPagasLiquidaciones
			--where year(Fechaliquidacion)=year(@fecha)
			where Fechaliquidacion<=@fecha
			group by cedulaEmpleado)							l	on	CAST(LTRIM(RTRIM(r.cod_emp))AS BIGINT) = CAST(LTRIM(RTRIM(l.cedulaempleado))AS BIGINT) 
left join	[Novasoft_CT_MM].dbo.gen_compania        cia	on	r.cod_cia = cia.cod_cia
left join	[Novasoft_CT_MM].dbo.gen_sucursal		s	on	r.cod_suc = s.cod_suc
left join	[Novasoft_CT_MM].dbo.gen_ccosto			cc	on	r.cod_cco = cc.cod_cco
left join	[Novasoft_CT_MM].dbo.gen_clasif1			c1	on	r.cod_cl1 = c1.codigo
left join	[Novasoft_CT_MM].dbo.gen_clasif2			c2	on	r.cod_cl2 = c2.codigo
left join	[Novasoft_CT_MM].dbo.gen_clasif3			c3	on	r.cod_cl3 = c3.codigo
left join	[Novasoft_CT_MM].dbo.gen_clasif5			c5	on	r.cod_cl5 = c5.codigo
where CAST(LTRIM(RTRIM(r.cod_emp))AS BIGINT) <> 0
and (r.fec_egr is null  or r.fec_egr >= DATEADD(yy, DATEDIFF(yy, 0, @fecha), 0))
and r.fec_ing <= @fecha
and r.cod_cia = @CodigoEmpresa
end

```
