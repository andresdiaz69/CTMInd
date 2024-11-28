# View: v_Act_centros_sincr_EstructuraCostos

## Usa los objetos:
- [[spiga_EstructuraDeCostos]]

```sql
--drop view v_Act_centros_sincr_EstructuraCostos
CREATE VIEW [dbo].[v_Act_centros_sincr_EstructuraCostos] AS
SELECT 
DISTINCT NombCentro ,Cod_empresa ,Nombre_Empresa ,Cod_Centro ,Nombre_Centro ,Cod_seccion ,Cod_Departamento ,Nombre_Departamento ,Nombre_Seccion	 
 FROM(
		SELECT CASE 
		WHEN Nombre_Centro  Like '%IBAGU%'                     THEN 'IBAGUÉ'
		WHEN Nombre_Centro  Like '%Cota%'                      THEN 'COTA'
		WHEN Nombre_Centro  Like '%Duitama%'                   THEN 'DUITAMA'
		WHEN Nombre_Centro  Like '%Itagui%'                    THEN 'ITAGUI'
		WHEN Nombre_Centro  Like '%Neiva%'                     THEN 'NEIVA'
		WHEN Nombre_Centro  Like '%JD-Monteria-Via Cereté%'    THEN 'MONTERÍA' 
	    WHEN Nombre_Centro  Like '%Yopal%'                     THEN 'YOPAL'
	    WHEN Nombre_Centro  Like '%FUNZA%'                     THEN 'FUNZA'
		WHEN Nombre_Centro  Like '%Villavo%'                   THEN 'VILLAVIC' 
	    WHEN Nombre_Centro  Like '%B/mang%'                    THEN 'BUCARAMA' WHEN Nombre_Centro  Like '%B/Mang%'                THEN 'BUCARAMA'
		WHEN Nombre_Centro  Like '%B/quil%'                    THEN 'BARRANQU' WHEN Nombre_Centro  Like '%B/Quil%'                THEN 'BARRANQU'	   
		WHEN Nombre_Centro  Like '%PER%'                       THEN 'PEREIRA'  WHEN Nombre_Centro  Like '%per%'                   THEN 'PEREIRA'
	    WHEN Nombre_Centro  Like '%BTA%'                       THEN 'BOGOTÁ'   WHEN Nombre_Centro  Like '%Btá%'                   THEN 'BOGOTÁ' WHEN Nombre_Centro  Like '%Bta%'          THEN 'BOGOTÁ' 
		WHEN Nombre_Centro  Like '%Bogot%'                     THEN 'BOGOTÁ'   WHEN Nombre_Centro  Like '%Bon%'                   THEN 'BOGOTÁ' WHEN Nombre_Centro  Like '%bellpi%'       THEN 'BOGOTÁ'
		WHEN Nombre_Centro  Like '%IR-Administración Central%' THEN 'BOGOTÁ'   WHEN Nombre_Centro  Like '%Centro Consignaciones%' THEN 'BOGOTÁ' WHEN Nombre_Centro  Like '%Centro Digit%' THEN 'BOGOTÁ' 
	    WHEN Nombre_Centro  Like '%Chía%'                      THEN 'CHÍA'     WHEN Nombre_Centro  Like '%Chia%'                  THEN 'CHÍA'   WHEN Nombre_Centro  Like '%CHIA%'         THEN 'CHÍA' WHEN Nombre_Centro  Like '%CHÍ%'     THEN 'CHÍA'
		WHEN Nombre_Centro  Like '%Cali%'                      THEN 'CALI'     WHEN Nombre_Centro  Like '%Pasoanch%'              THEN 'CALI'   WHEN Nombre_Centro  Like '%Pasoanch%'     THEN 'CALI' WHEN Nombre_Centro  Like '%Ruta 40%' THEN 'CALI'
		ELSE RTRIM(LTRIM(UPPER(SUBSTRING(SUBSTRING(Nombre_Centro,(CHARINDEX('-',Nombre_Centro)+1),LEN(Nombre_Centro)),1,8)))) END AS NombCentro
		,Cod_empresa ,Nombre_Empresa ,Cod_Centro ,Nombre_Centro ,Cod_seccion ,Cod_Departamento ,Nombre_Departamento ,Nombre_Seccion	 
		FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos
	 )a

 

```
