# View: vw_MLC_liquidacion_contable_nomina_cuadro_gastos

## Usa los objetos:
- [[vw_MLC_liquidacion_contable_nomina]]

```sql
CREATE view [dbo].[vw_MLC_liquidacion_contable_nomina_cuadro_gastos] as
select concepto,fec_liq,año,mes,cod_con,nom_con,cod_cia,nom_cia,cod_marca,nombre_marca,
cod_centro = case	when cod_centro = 79 then 81
					when cod_centro = 59 then 12
					when cod_centro = 150 then 5
					when (cod_centro = 54 and cod_seccion = 614) then 7
					when (cod_centro = 54 and cod_seccion = 613)  then 53
					when cod_centro = 73 then 2
					when cod_centro = 58 then 147
					when (cod_centro = 51 and cod_seccion = 616) then 1
					when (cod_centro = 51 and cod_seccion = 615) then 50
					when cod_centro = 68 then  66
					when cod_centro = 64 then  20
					when (cod_Centro = 69 and cod_seccion = 606) then 70
					when (cod_Centro = 69 and cod_seccion = 607) then 71
					when (cod_Centro = 69 and cod_seccion = 605) then 19
					when (cod_Centro = 69 and cod_seccion = 604) then 72
			else cod_centro end ,
nombre_centro = case	when cod_centro = 79 then 'MIT-Bta-AV 68'
					when cod_centro = 59 then 'RN-Bta-Av.Ciudad Cali'
					when cod_centro = 150 then 'MZ-Bta-Cl.155'
					when (cod_centro = 54 and cod_seccion = 614) then 'FR-Bta-Cl.170'
					when (cod_centro = 54 and cod_seccion = 613)  then 'VW-Bta-Cl.170'
					when cod_centro = 73 then 'MZ-Bta-Cra.30'
					when cod_centro = 58 then 'FR-Bta.-AV 68'
					when (cod_centro = 51 and cod_seccion = 616) then 'RN-Bta-P.Aranda'
					when (cod_centro = 51 and cod_seccion = 615) then 'VW-Bta-P. Aranda'
					when cod_centro = 68 then  'RN-Ibague-Z.I. Mirolindo'
					when cod_centro = 64 then  'MZ-Neiva-Cra.5'
					when (cod_Centro = 69 and cod_seccion = 606) then 'FR-Villavo-Anillo Vial 1'
					when (cod_Centro = 69 and cod_seccion = 607) then 'MZ-Villavo-Anillo Vial 1'
					when (cod_Centro = 69 and cod_seccion = 605) then 'RN-Villavo-Torre'
					when (cod_Centro = 69 and cod_seccion = 604) then 'VW-Villavo-Anillo Vial 1'
			else nombre_centro end ,

cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal,valor=sum(valor)
from 
(
		--SALARIOS INTEGRALES
		select Concepto='Salarios integrales',fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal,
		Valor=sum(valor)
		from vw_MLC_liquidacion_contable_nomina
		where 
		--año=2020
		--and mes=3
		--and nombre_marca = 'MMC - MITSUBISHI'
		cod_con like '001050'
		and cla_sal=2
		group by fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal
		--order by cod_marca

		UNION ALL

		--SUELDOS
		select Concepto='Sueldos',fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal,
		Valor=sum(valor)
		from vw_MLC_liquidacion_contable_nomina
		where 
		--año=2020
		--and mes=3
		--and nombre_marca = 'MMC - MITSUBISHI'
		cod_con like '001050'
		and cla_sal=1
		group by fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal
		--order by cod_marca

		UNION ALL
		--COMISIONES VN
		select Concepto='Comisiones Nuevos',fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal,
		Valor=sum(valor)
		from vw_MLC_liquidacion_contable_nomina
		where 
		--año=2020
		--and mes=3
		--and nombre_marca = 'MMC - MITSUBISHI'
		cod_departamento = 'VN'
		and cod_con like '1%'
		and (nom_con not like '%movilizac%' and nom_con not like '%celular%')
		and (nom_con like '%comisi%' or nom_con like '%gestion%' or nom_con like '%garantizado%')
		group by fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal
		--order by cod_marca

		UNION ALL

		--COMISIONES REPUESTOS MOSTRADOR
		select Concepto='Comisiones Repuestos',fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal,
		Valor=sum(valor)
		from vw_MLC_liquidacion_contable_nomina
		where 
		--año=2020
		--and mes=3
		--and nombre_marca = 'MMC - MITSUBISHI'
		cod_departamento = 'RE'
		and cod_con like '1%'
		and (nom_con not like '%movilizac%' and nom_con not like '%celular%')
		and (nom_con like '%comisi%' or nom_con like '%garantizado%')
		group by fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal

		UNION ALL

		--COMISIONES REPUESTOS TALLER
		select Concepto='Comisiones Repuestos',fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal,
		Valor=sum(valor)
		from vw_MLC_liquidacion_contable_nomina
		where 
		--año=2020
		--and mes=3
		--and nombre_marca = 'MMC - MITSUBISHI'
		cod_departamento in ('TC','TM')
		and cod_con like '1%'
		and (nom_con not like '%movilizac%' and nom_con not like '%celular%')
		and nom_con like '%Comisión Repuestos%'
		group by fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal
		--order by cod_marca

		UNION ALL

		--COMISIONES MANO DE OBRA TALLER
		select Concepto='Comisiones Mano de Obra',fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal,
		Valor=sum(valor)
		from vw_MLC_liquidacion_contable_nomina
		where 
		--año=2020
		--and mes=3
		--and nombre_marca = 'MMC - MITSUBISHI'
		cod_departamento in ('TC','TM')
		and cod_con like '1%'
		and (nom_con not like '%movilizac%' and nom_con not like '%celular%' and nom_con not like '%Comisión Repuestos%')
		and (nom_con  like '%comisi%' or nom_con like '%garantizado%' or nom_con like '%IBC%')
		group by fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal
		--order by cod_marca

		UNION ALL

		--INCENTIVOS
		select Concepto='Incentivos',fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal,
		Valor=sum(valor)
		from vw_MLC_liquidacion_contable_nomina
		where 
		--año=2020
		--and mes=3
		--and nombre_marca = 'MMC - MITSUBISHI'
		cod_con like '1%'
		and nom_con  like '%INCENT%'
		group by fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal
		--order by cod_marca

		UNION ALL

		--BONIFICACION
		select Concepto='Bonificaciones',fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal,
		Valor=sum(valor)
		from vw_MLC_liquidacion_contable_nomina
		where 
		--año=2020
		--and mes=3
		--and nombre_marca = 'MMC - MITSUBISHI'
		cod_con like '1%'
		and nom_con  like '%BONIFICA%'
		group by fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal
		--order by cod_marca

		UNION ALL

		--PRESTACIONES Y APORTES
		select Concepto='Prestaciones y Aportes',fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal,
		Valor=sum(valor)
		from vw_MLC_liquidacion_contable_nomina
		where 
		--año=2020
		--and mes=3
		--and nombre_marca = 'MMC - MITSUBISHI'
		cod_con  in ('002222','002915','002230','002910','002220','002221','002205','002232','002960','002965','002955','002905','002970')
		group by fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal
		,cuenta_debito,cuenta_credito
		--order by cod_marca

		UNION ALL

		--OTROS GASTOS
		select Concepto='Otros Gastos',fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal,
		Valor=sum(valor)
		from vw_MLC_liquidacion_contable_nomina
		where 
		--año=2020
		--and mes=3
		--and nombre_marca = 'MMC - MITSUBISHI'
		cod_con not in ('001050','002222','002915','002230','002910','002220','002221','002205','002232','002960','002965','002955','002905','002970')
		and nom_con not like '%comisi%' and nom_con not like '%gestion%' and nom_con not like '%garantizado%' 
		and nom_con not like '%IBC%' and nom_con  not like '%INCENT%' and nom_con  not like '%BONIFICA%'
		group by fec_liq,año,mes,cod_con,nom_con,Cod_cia,nom_cia,cod_marca,nombre_marca,cod_centro,nombre_centro,
		cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal
		,cuenta_debito,cuenta_credito
		--order by cod_marca
) a
--where año=2020
--and mes=6
group by concepto,fec_liq,año,mes,cod_con,nom_con,cod_cia,nom_cia,cod_marca,nombre_marca,
cod_centro,nombre_centro,cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,cla_sal
```
