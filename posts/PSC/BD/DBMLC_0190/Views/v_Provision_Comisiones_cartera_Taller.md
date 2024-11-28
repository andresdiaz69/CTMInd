# View: v_Provision_Comisiones_cartera_Taller

## Usa los objetos:
- [[spiga_Cartera]]

```sql
CREATE  view [dbo].[v_Provision_Comisiones_cartera_Taller] as -- se debe tener en cuenta que debe ser hasta el mes anterior
select Ano_Periodo,Mes_Periodo,IdEmpresas,NombreCentro,Valor= sum(Valor)
from(
		select c.Ano_Periodo,c.Mes_Periodo,c.IdEmpresas,
		NombreCentro=case	
							when (c.NombreCentro = 'CO-Bta-Cl 170'				and c.DescripcionSeccion = 'Colisión FR-Bta- Calle 170')			then 'FR-Bta-Cl.170'
							when (c.NombreCentro = 'CO-Bta-Cl 170'				and c.DescripcionSeccion IS NULL)									then 'FR-Bta-Cl.170'
							when (c.NombreCentro = 'CO-Bta-Cl 170'				and c.DescripcionSeccion = 'Colisión VW-Bta- Calle 170')			then 'VW-Bta-Cl.170'
							when (c.NombreCentro = 'CO-Bta-Cl 170'				and c.DescripcionSeccion = 'Taller Colisión Calle 170')				then 'VW-Bta-Cl.170'
							when (c.NombreCentro = 'CO-Bta-P. Aranda'			and c.DescripcionSeccion = 'Colisión RN-Bta- Puente Aranda')		then 'RN-Bta-P.Aranda'
							when (c.NombreCentro = 'CO-Bta-P. Aranda'			and c.DescripcionSeccion IS NULL)									then 'RN-Bta-P.Aranda'
							when (c.NombreCentro = 'CO-Bta-P. Aranda'			and c.DescripcionSeccion = 'Colisión VW-Bta- Puente Aranda')		then 'VW-Bta-P. Aranda'
							when (c.NombreCentro = 'CO-Villavo-Anillo Vial 1'	and c.DescripcionSeccion = 'Colisión FR-Villavo- Anillo Vial 1')	then 'FR-Villavo-Anillo Vial 1'
							when (c.NombreCentro = 'CO-Villavo-Anillo Vial 1'	and c.DescripcionSeccion = 'Colisión MZ-Villavo- Anillo Vial 1')	then 'MZ-Villavo-Anillo Vial 1'
							when (c.NombreCentro = 'CO-Villavo-Anillo Vial 1'	and c.DescripcionSeccion IS NULL)									then 'MZ-Villavo-Anillo Vial 1'
							when (c.NombreCentro = 'CO-Villavo-Anillo Vial 1'	and c.DescripcionSeccion = 'Colisión RN-Villavo- Anillo Vial 1')	then 'RN-Villavo-Torre'
							when (c.NombreCentro = 'CO-Villavo-Anillo Vial 1'	and c.DescripcionSeccion = 'Colisión VW-Villavo- Anillo Vial 1')	then 'VW-Villavo-Anillo Vial 1'
							when (c.NombreCentro = 'CO-Bta-Cra 50'				and c.DescripcionSeccion = 'Taller Colisión MZ Carrera 50')			then 'MZ-Bta-Cra.50'
							when (c.NombreCentro = 'CO-Bta-Cra 50'				and c.DescripcionSeccion IS NULL)									then 'MZ-Bta-Cra.50'
							when (c.NombreCentro = 'CO-Bta-Cra 50'				and c.DescripcionSeccion = 'Taller Colisión Usados Cra 50')			then 'VO-Bta-Cra 50'
							when (c.NombreCentro = 'CO-Ibague-Z.I. Mirolindo'	and c.DescripcionSeccion = 'Taller Colisión Ibagué Mirolindo')		then 'VW-Ibague-Z.I. Mirolindo'
							when (c.NombreCentro = 'CO-Ibague-Z.I. Mirolindo'	and c.DescripcionSeccion = 'Colisión VW-Ibague-Z.I. Mirolindo')		then 'VW-Ibague-Z.I. Mirolindo'
							when (c.NombreCentro = 'CO-Ibague-Z.I. Mirolindo'	and c.DescripcionSeccion = 'Colisión RN-Ibague-Z.I. Mirolindo')		then 'RN-Ibague-Z.I. Mirolindo'
							when (c.NombreCentro = 'CO-Ibague-Z.I. Mirolindo'	and c.DescripcionSeccion IS NULL)									then 'RN-Ibague-Z.I. Mirolindo'
							when (c.NombreCentro = 'CO-Ibague-Z.I. Mirolindo'	and c.DescripcionSeccion = 'Colisión MZ-Ibague-Z.I. Mirolindo')		then 'MZ-Ibague-Villa Marina'
							when (c.NombreCentro = 'CO-Ibague-Mirolindo'		and c.DescripcionSeccion = 'Taller Colision Mit Mirolindo Ibagué')	then 'MIT-Ibague-Mirolindo'
							when (c.NombreCentro = 'CO-Ibague-Mirolindo'		and c.DescripcionSeccion IS NULL)									then 'MIT-Ibague-Mirolindo'
							when (c.NombreCentro = 'CO-Ibague-Mirolindo'		and c.DescripcionSeccion = 'Taller Colision Dai Mirolindo Ibagué')	then 'DAI.V-Ibague-Mirolindo'
					else c.NombreCentro end,
		Valor = sum(c.TotalFactura)
		from		[PSCService_DB].dbo.spiga_Cartera	c
		where c.Departamento in ('TA')
		--and c.Ano_Periodo = 2020
		--and c.Mes_Periodo = 5
		--and month(c.FechaFactura) < 5 
		
		group by c.Ano_Periodo,c.Mes_Periodo,c.IdEmpresas,c.NombreCentro,c.DescripcionSeccion
) b
group by Ano_Periodo,Mes_Periodo,IdEmpresas,NombreCentro

```
