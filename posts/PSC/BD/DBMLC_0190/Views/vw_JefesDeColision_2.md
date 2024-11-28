# View: vw_JefesDeColision_2

## Usa los objetos:
- [[Centros]]
- [[ExogenasPresupuestosJefesDeColision]]
- [[vw_JefesDeColision_Ventas]]

```sql
CREATE VIEW [dbo].[vw_JefesDeColision_2] AS

SELECT A.Año, A.Mes, C.CodigoCentro, C.NombreCentro, A.Valor AS Ventas, ISNULL(P.Presupuesto,0)AS Presupuesto
FROM
(
	select año,mes,Valor=sum(valor),sede2
	from (
			select Año, Mes,Sede, Valor,
		CASE WHEN Sede = 'VW-Ibague-Z.I. Mirolindo' and CodigoPresentacion = 91 then 'CO-Ibague-Z.I. Mirolindo'
			WHEN Sede = 'RN-Ibague-Z.I. Mirolindo' and CodigoPresentacion = 91 then 'CO-Ibague-Z.I. Mirolindo'
			WHEN Sede = 'MZ-Ibague-Z.I. Mirolindo' and CodigoPresentacion = 91 then 'CO-Ibague-Z.I. Mirolindo'
			WHEN Sede = 'Talller-Ibague-Z.I. Mirolindo' and CodigoPresentacion = 91 then 'CO-Ibague-Z.I. Mirolindo'
			WHEN Sede = 'Colisión Mit Mirolindo' and CodigoPresentacion = 91 then 'CO-Ibague-Z.I. Mirolindo'
			WHEN Sede = 'Colisión Dai Mirolindo' and CodigoPresentacion = 91 then 'CO-Ibague-Z.I. Mirolindo'
			WHEN Sede = 'Colisión Dai Picaleña' and CodigoPresentacion = 91 then 'CO-Ibague-Z.I. Mirolindo'
			WHEN Sede = 'Colisión Picaleña' and CodigoPresentacion = 91 then 'CO-Ibague-Z.I. Mirolindo'
			WHEN Sede = 'Colisión BYD Mirolindo' and CodigoPresentacion = 91 then 'CO-Ibague-Z.I. Mirolindo'

			WHEN Sede = 'VW-Villavo-Anillo Vial 1'  and CodigoPresentacion = 92 then 'CO-Villavo-Anillo Vial 1'
			WHEN Sede = 'Colisión Anillo Vial'		and CodigoPresentacion = 92 then 'CO-Villavo-Anillo Vial 1'
			WHEN Sede = 'RN-Villavo- Anillo Vial 1'	and CodigoPresentacion = 92 then 'CO-Villavo-Anillo Vial 1'
			WHEN Sede = 'FR-Villavo-Anillo Vial 1'  and CodigoPresentacion = 92 then 'CO-Villavo-Anillo Vial 1' 
			WHEN Sede = 'MZ-Villavo-Anillo Vial 1'  and CodigoPresentacion = 92 then 'CO-Villavo-Anillo Vial 1'

			WHEN Sede = 'CO-Bta-Cll 170 MM' and CodigoPresentacion = 97 then 'CO-Bta-Cl 170'
			WHEN Sede = 'CO-Bta-Cl 170' and CodigoPresentacion = 97 then 'CO-Bta-Cl 170'
			
			
		 --   Sede = 'BN-JD-Bta-Centro de Aduanas' THEN 'BYD-Bogotá Av. 68'
			--WHEN Sede = 'BYD Bogota Av 68' THEN 'BYD-Bogotá Av. 68'
			--WHEN Sede = 'BYD Bogota Calle 127' THEN 'BYD-Btá-Calle 127'
			--WHEN Sede = 'BYD Bogota Mayorista' THEN 'BYD-Bta-Mayorista Vehículos'
			--WHEN Sede = 'DAI.C-Bta-Cll 80'   THEN 'DAI.C-Cota-Cll 80'
			--WHEN Sede = 'Daimler Auto Norte' THEN 'DAI.V-Bta-Aut.Norte'
			--WHEN Sede = 'Daimler Calle 80' THEN 'DAI.C-Cota-Cll 80'
			--WHEN Sede = 'Fabrica Colision' THEN 'CO-Chia-Fabrica Colision'
			--WHEN Sede = 'Ford - 170' THEN 'FR-Bta-Cl.170'
			--WHEN Sede = 'Ford - Chía' THEN 'FR-Chia-Vía Cajicá'
			--WHEN Sede = 'Ford -San Fernando' THEN 'FR-Bta-S.Fernando'
			--WHEN Sede = 'FR-Bta-Chicó' THEN 'FR-Bta-Administrativo'
			--WHEN Sede = 'JD Centro Aduanas' THEN 'JD-Bta Centro Aduanas'
			--WHEN Sede = 'JD-Bta-P.Aranda' THEN 'JD-Bta-P. Aranda'
			--WHEN Sede = 'JD-Cali-Yumbo' THEN 'JD-Cali-Palmira'
			--WHEN Sede = 'JD-Ib-ZI Mirolindo' THEN 'JD-Ibague-ZI Mirolindo'
			--WHEN Sede = 'Mazda - Calle 155' THEN 'MZ-Bta-Cl.155'
			--WHEN Sede = 'Mazda - Carrera 30' THEN 'MZ-Bta-Cra.30'
			--WHEN Sede = 'Mazda Carrera 50' THEN 'MZ-Bta-Cra.50'
			--WHEN Sede = 'MIT - Calle 123' then 'MIT-Bta-Calle 123'
			--WHEN Sede = 'MIT Aduanas Repuestos' THEN 'MIT-Bta Aduanas Repuestos'
			--WHEN Sede = 'MIT-Bta-Cll 170' THEN 'MIT-Bta-Vitrina itinerante sabana'
			--WHEN Sede = 'MIT-Bta-Gran Estacion' THEN 'MIT-Bta-Administrativo min Mit'
			--WHEN Sede = 'MZ-Bta-Mayorista Cr. 30' THEN 'MZ-Bta-Administrativo MZ'
			--WHEN Sede = 'MZ-Ibague-Z.I. Mirolindo' THEN 'MZ-Ibague-Villa Marina'
			--WHEN Sede = 'Operaciones Cerradas' THEN 'Operaciones Cerradas-Bta-'
			--WHEN Sede = 'Renault - Auto 222' THEN 'RN-Bta-Administrativo RN'
			--WHEN Sede = 'Renault - Av Cali' THEN 'RN-Bta-Av.Ciudad Cali'
			--WHEN Sede = 'Renault - Calle 80' THEN 'RN-Bta-San Fernando'
			--WHEN Sede = 'Renault - Puente Aranda' THEN 'RN-Bta-P.Aranda'
			--WHEN Sede = 'RN-Bta-Aut.Norte 222' THEN 'RN-Bta-Administrativo RN'
			--WHEN Sede = 'RN-Bta-Cl.80' THEN 'RN-Bta-San Fernando'
			--WHEN Sede = 'VO-Bta-AV Ciudad De Cali' THEN 'VO-Bta-Av. Ciudad Cali'
			--WHEN Sede = 'VO-Bta-Cl.116' THEN 'VO-Bta-Cl.135'
			--WHEN Sede = 'VO-Bta-Cra 50' THEN 'VO-Bta.-bellpi Usados'
			--WHEN Sede = 'VO-Bta-Dg.79' THEN 'VO-Bta-Centro Administrativo usados'
			--WHEN Sede = 'Volkswagen - 170' THEN 'VW-Bta-Cl.170'
			--WHEN Sede = 'Volkswagen - Puente Aranda' THEN 'VW-Bta-P. Aranda'
			--WHEN Sede = 'VW-Bta-Aut.Sur' THEN 'VW-Bta-Administrativo VW'
			
			
			
			ELSE SEDE
			end as sede2
			from vw_JefesDeColision_Ventas as a
	) b group by año,mes,sede2
)AS A
left join Centros c on a.sede2 = c.NombreCentro
LEFT join ExogenasPresupuestosJefesDeColision AS P ON c.CodigoCentro = P.CodigoCentro AND A.Año = P.Ano AND A.Mes = P.Mes

--WHERE A.Año=2024
--AND A.Mes=1

```
